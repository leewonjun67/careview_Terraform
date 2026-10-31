from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from mangum import Mangum
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db


def create_app() -> FastAPI:
    app = FastAPI(
        title="CareView API",
        version="v1",
        description="로그인, 회원가입, 일정 관리 등을 위한 API",
    )

    # 브라우저에서 백엔드 API 호출을 허용할 프런트엔드 출처
    allowed_origins = [
        # 로컬 개발
        "http://localhost:3000",
        "http://localhost:5173",

        # 기존 프런트 배포 주소
        "https://careview-front.onrender.com",
        "https://careview.kro.kr",
        "https://www.careview.kro.kr",

        # 기존 S3 정적 웹사이트 주소
        "http://careview-front-bucket.s3-website.ap-northeast-2.amazonaws.com",

        # 현재 CloudFront 프런트엔드 주소
        "https://d18nlrjzbq5l8h.cloudfront.net",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=[
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],
        allow_headers=[
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With",
        ],
    )

    # 앱 초기화 시 라우터 불러오기
    from app.api.endpoints import (
        exercise,
        expected_effect,
        main_page,
        meals,
        onboarding,
        record,
        user,
    )

    app.include_router(user.router, tags=["Users"])
    app.include_router(onboarding.router, tags=["Onboarding"])
    app.include_router(record.router, tags=["Record"])
    app.include_router(main_page.router, tags=["Main Page"])
    app.include_router(meals.router, tags=["meals"])
    app.include_router(exercise.router, tags=["Exercise"])
    app.include_router(expected_effect.router, tags=["Expected Effect"])

    @app.get("/")
    def read_root():
        return {
            "message": "Welcome to CareView API V1",
        }

    @app.get("/health", tags=["Health Check"])
    def health_check(db: Session = Depends(get_db)):
        try:
            db.execute(text("SELECT 1"))

            return {
                "status": "ok",
                "db": "connected",
                "message": "CareView API is running and DB is connected",
            }

        except Exception as error:
            return {
                "status": "error",
                "db": "disconnected",
                "message": f"DB connection failed: {error}",
            }

    def custom_openapi():
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            description=app.description,
            routes=app.routes,
        )

        openapi_schema.setdefault("components", {})

        openapi_schema["components"]["securitySchemes"] = {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
            }
        }

        protected_tags = {
            "Users",
            "Onboarding",
            "Record",
            "Main Page",
            "meals",
            "Exercise",
            "Expected Effect",
        }

        security_requirement = [{"BearerAuth": []}]

        for path_item in openapi_schema.get("paths", {}).values():
            for operation in path_item.values():
                if not isinstance(operation, dict):
                    continue

                tags = operation.get("tags", [])

                if any(tag in protected_tags for tag in tags):
                    operation["security"] = security_requirement

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    app.openapi = custom_openapi

    return app


app = create_app()

# Lambda Function URL → Mangum → FastAPI
handler = Mangum(app)
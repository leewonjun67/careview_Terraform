from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.config import settings


# SQLAlchemy 엔진
# Lambda 컨테이너가 재사용되는 동안 엔진과 커넥션 풀도 재사용됩니다.
engine: Engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args={
        "connect_timeout": 5,
    },
)


# DB 세션 생성기
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
)


# FastAPI 의존성 주입용 DB 세션
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# SQLAlchemy 모델들이 상속할 기본 클래스
Base = declarative_base()
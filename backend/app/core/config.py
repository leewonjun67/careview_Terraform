# app/core/config.py

import os
from typing import Final

from pydantic_settings import BaseSettings, SettingsConfigDict

from app.core.secrets import get_backend_secrets


REQUIRED_SECRET_KEYS = (
    "DATABASE_URL",
    "SECRET_KEY",
)


def load_runtime_secrets() -> None:
    """
    AWS Lambda에서는 Secrets Manager의 값을 환경 변수에 주입합니다.

    로컬 환경에서는 CAREVIEW_SECRET_NAME이 없으므로
    백엔드 루트의 .env 파일을 그대로 사용합니다.
    """
    secret_name = os.getenv("CAREVIEW_SECRET_NAME")

    # 로컬 개발 환경에서는 Secrets Manager를 호출하지 않음
    if not secret_name:
        return

    secret_data = get_backend_secrets()

    missing_keys = [
        key
        for key in REQUIRED_SECRET_KEYS
        if not secret_data.get(key)
    ]

    if missing_keys:
        missing = ", ".join(missing_keys)
        raise RuntimeError(
            f"Secrets Manager에 필수 설정값이 없습니다: {missing}"
        )

    # 기존 Lambda 환경 변수보다 Secrets Manager 값을 우선 적용
    for key in REQUIRED_SECRET_KEYS:
        os.environ[key] = secret_data[key]


# Settings 객체를 만들기 전에 Secret을 먼저 불러옴
load_runtime_secrets()


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str

    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )


settings: Final[Settings] = Settings()
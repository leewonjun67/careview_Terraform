# app/core/secrets.py

import json
import os
from functools import lru_cache

import boto3
from botocore.exceptions import BotoCoreError, ClientError


@lru_cache(maxsize=1)
def get_backend_secrets() -> dict[str, str]:
    """
    AWS Secrets Manager에서 CareView 운영 비밀값을 불러옵니다.

    로컬 환경에서는 CAREVIEW_SECRET_NAME이 없으므로
    Secrets Manager를 호출하지 않고 빈 딕셔너리를 반환합니다.
    이후 config.py가 로컬 .env 파일을 사용합니다.
    """
    secret_name = os.getenv("CAREVIEW_SECRET_NAME")

    # 로컬 개발 환경
    if not secret_name:
        return {}

    client = boto3.client("secretsmanager")

    try:
        response = client.get_secret_value(
            SecretId=secret_name,
        )
    except ClientError as exc:
        error_code = exc.response.get("Error", {}).get(
            "Code",
            "UnknownError",
        )

        raise RuntimeError(
            f"Secrets Manager 조회에 실패했습니다: {error_code}"
        ) from exc

    except BotoCoreError as exc:
        raise RuntimeError(
            "AWS SDK 통신 중 오류가 발생했습니다."
        ) from exc

    secret_string = response.get("SecretString")

    if not secret_string:
        raise RuntimeError(
            "Secrets Manager의 SecretString이 비어 있습니다."
        )

    try:
        secret_data = json.loads(secret_string)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            "Secrets Manager 값이 올바른 JSON 형식이 아닙니다."
        ) from exc

    if not isinstance(secret_data, dict):
        raise RuntimeError(
            "Secrets Manager 값은 JSON 객체 형식이어야 합니다."
        )

    return {
        str(key): str(value)
        for key, value in secret_data.items()
    }
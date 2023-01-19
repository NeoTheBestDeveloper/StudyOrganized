from datetime import datetime
from typing import Any

from fastapi_users import schemas
from pydantic import EmailStr, FileUrl, Json, PositiveInt, validator
from pydantic.fields import Field


class UserReadSchema(schemas.BaseUser[int]):
    id: PositiveInt
    name: str
    email: EmailStr
    registered_at: datetime
    avatar_url: FileUrl | None
    settings: Json[Any]
    is_active: bool
    is_superuser: bool
    is_verified: bool

    class Config:
        orm_mode = True

    @validator('settings', pre=True)
    def settings_to_str(cls, settings: dict) -> str:
        return str(settings)


class UserCreateSchema(schemas.BaseUserCreate):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8)
    is_active: bool | None = True
    is_superuser: bool | None = False
    is_verified: bool | None = False

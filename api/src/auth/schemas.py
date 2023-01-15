from datetime import datetime
from typing import Any

from fastapi_users import schemas
from pydantic import EmailStr, FileUrl, Json, PositiveInt, validator
from pydantic.fields import Field


class UserReadSchema(schemas.BaseUser[int]):
    id: PositiveInt
    name: str
    email: EmailStr  # = Field(max_length=320)
    avatar_url: FileUrl | None
    registered_at: datetime
    settings: Json[Any] | None
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    @validator('settings')
    def validator(cls, settings):
        return str(settings)

    class Config:
        orm_mode = True


class UserCreateSchema(schemas.BaseUserCreate):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr  # = Field(max_length=320)
    avatar_url: FileUrl | None
    registered_at: datetime | None
    settings: Json[Any] | None
    is_active: bool | None = True
    is_superuser: bool | None = False
    is_verified: bool | None = False

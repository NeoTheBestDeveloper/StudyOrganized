from datetime import datetime
from typing import Any

from fastapi_users import schemas
from pydantic import EmailStr, FileUrl, Json, validator
from pydantic.fields import Field


class UserReadSchema(schemas.BaseUser[int]):
    name: str
    email: EmailStr
    registered_at: datetime
    avatar_url: FileUrl | None
    settings: Json[Any] | None
    is_active: bool
    is_superuser: bool
    is_verified: bool

    class Config:
        orm_mode = True

    @validator('id')
    def del_id(cls, id: int) -> None:
        return None

    @validator('settings', pre=True)
    def settings_to_str(cls, settings: dict) -> str:
        return str(settings)


class UserCreateSchema(schemas.BaseUserCreate):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr
    password: str
    is_active: bool | None = True
    is_superuser: bool | None = False
    is_verified: bool | None = False

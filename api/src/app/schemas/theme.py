from datetime import datetime

from pydantic import BaseModel, Field, PositiveInt

from ...auth import UserReadSchema
from . import ReadResourceSchema


class ReadThemeSchema(BaseModel):
    id: PositiveInt
    user: UserReadSchema
    resources: list[ReadResourceSchema]
    title: str = Field(max_length=255)
    description: str | None = None
    created_at: datetime

    class Config:
        orm_mode = True


class CreateThemeSchema(BaseModel):
    title: str = Field(max_length=255)


class UpdateThemeSchema(BaseModel):
    title: str = Field(max_length=255)
    description: str | None

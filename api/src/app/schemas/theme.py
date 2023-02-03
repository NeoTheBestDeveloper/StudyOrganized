from datetime import datetime

from pydantic import BaseModel, Field, PositiveInt

from ...auth import UserReadSchema


class ReadThemeSchema(BaseModel):
    id: PositiveInt
    user: UserReadSchema
    title: str = Field(max_length=255)
    description: str | None = None
    created_at: datetime

    class Config:
        orm_mode = True


class CreateThemeSchema(BaseModel):
    title: str = Field(min_length=1, max_length=255)


class UpdateThemeSchema(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None

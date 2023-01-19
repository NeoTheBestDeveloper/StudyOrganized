from datetime import datetime

from pydantic import BaseModel, Field, PositiveInt

from ...auth import UserReadSchema


class ReadThemeSchema(BaseModel):
    id: PositiveInt
    user_id: PositiveInt
    user: UserReadSchema
    title: str
    description: str | None = None
    created_at: datetime

    class Config:
        orm_mode = True


class CreateUpdateThemeSchema(BaseModel):
    title: str = Field(max_length=255)
    description: str | None = None

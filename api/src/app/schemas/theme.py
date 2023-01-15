from datetime import datetime

from pydantic import BaseModel, Field, PositiveInt


class ThemeSchema(BaseModel):
    id: PositiveInt | None
    user_id: PositiveInt | None
    title: str = Field(max_length=255)
    short_description: str = Field(max_length=255)
    full_description: str | None
    created_at: datetime | None

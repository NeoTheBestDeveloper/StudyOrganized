from datetime import datetime

from pydantic import BaseModel, PositiveInt, Field


class ResourceSchema(BaseModel):
    id: PositiveInt | None

    title: str = Field(max_length=255)
    short_description: str = Field(max_length=255)
    full_description: str | None
    create_date = datetime
    theme_id: PositiveInt

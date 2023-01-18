from pydantic import BaseModel, PositiveInt, Field


class ResourceSchema(BaseModel):
    id: PositiveInt | None
    title: str = Field(max_length=255)
    description: str | None
    theme_id: PositiveInt

    class Config:
        orm_mode = True

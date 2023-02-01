from pydantic import BaseModel, PositiveInt, Field


class ReadResourceSchema(BaseModel):
    id: PositiveInt
    user_id: PositiveInt
    theme_id: PositiveInt
    title: str = Field(max_length=255)
    description: str | None = ''

    class Config:
        orm_mode = True


class UpdateResourceSchema(BaseModel):
    title: str = Field(max_length=255)
    description: str | None = None


class CreateResourceSchema(BaseModel):
    title: str = Field(max_length=255)
    theme_id: PositiveInt

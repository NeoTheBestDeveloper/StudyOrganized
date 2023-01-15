from sqlalchemy import Column, ForeignKey, String, Integer, Table, Text

from src.database import Base

resource = Table(
    "resource",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String(255), nullable=False),
    Column("short_description", String(255), nullable=True, default=""),
    Column("full_description", Text, nullable=True, default=""),
    Column("theme_id", Integer, ForeignKey('theme.id', ondelete='cascade')),
)

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from core.db import Base


class Task(Base):
    __tablename__ = "api_tasks"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    title = Column(String(255))
    description_text = Column(Text)
    decription_image_url = Column(String(255), nullable=True)
    answer_text = Column(Text)
    answer_image_url = Column(String(255), nullable=True)

    theme = Column(Integer, ForeignKey('api_themes.id'))
    theme_id = relationship("Theme")

    user = Column(Integer, ForeignKey('api_users.id'))
    user_id = relationship("User")

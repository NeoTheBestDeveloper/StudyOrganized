from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from core.db import Base


class FlashCard(Base):
    __tablename__ = "api_flash_cards"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    title = Column(String(255))
    front = Column(Text, nullable=True)
    front_image_url = Column(String(255), nullable=True)
    back = Column(Text, nullable=True)
    back_image_url = Column(String(255), nullable=True)

    theme = Column(Integer, ForeignKey('api_themes.id'))
    theme_id = relationship("Theme")

    user = Column(Integer, ForeignKey('api_users.id'))
    user_id = relationship("User")

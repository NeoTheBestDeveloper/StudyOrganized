from sqlalchemy import Integer, Column, ForeignKey, String, Text
from sqlalchemy.orm import relationship

from core.db import Base


class Test(Base):
    __tablename__ = "api_tests"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    title = Column(String(255))
    description = Column(Text)

    theme = Column(Integer, ForeignKey('api_themes.id'))
    theme_id = relationship("Theme")
    user = Column(Integer, ForeignKey('api_users.id'))
    user_id = relationship("User")

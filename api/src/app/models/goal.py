from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from core.db import Base


class Goal(Base):
    __tablename__ = "api_goals"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    title = Column(String(255))
    create_date = Column(DateTime, server_default=func.now())
    due_date = Column(DateTime)
    is_done = Column(Boolean)

    task_id = Column(Integer)
    task_type = Column(String(32))

    user = Column(Integer, ForeignKey('api_users.id'))
    user_id = relationship("User")

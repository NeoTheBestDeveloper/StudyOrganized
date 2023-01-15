from sqlalchemy import Column, Integer, JSON, SmallInteger, ForeignKey, Text
from sqlalchemy.orm import relationship

from core.db import Base


class Question(Base):
    __tablename__ = "api_questions"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    text = Column(Text)
    answers = Column(JSON)
    right_answer = Column(SmallInteger)

    test = Column(Integer, ForeignKey('api_tests.id'))
    test_id = relationship("Test")

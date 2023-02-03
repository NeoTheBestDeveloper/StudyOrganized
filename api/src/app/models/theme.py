from sqlalchemy import TIMESTAMP, Column, ForeignKey, \
        String, Integer, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ...database import Base


class Theme(Base):
    __tablename__ = 'themes'

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        server_default=func.now(),
                        nullable=False)
    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete='cascade'),
                     nullable=False)
    user = relationship("User", lazy='selectin')

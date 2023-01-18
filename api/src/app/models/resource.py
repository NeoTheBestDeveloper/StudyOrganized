from sqlalchemy import Column, ForeignKey, String, Integer, Text

from ...database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    theme_id = Column(Integer,
                      ForeignKey('themes.id', ondelete='cascade'),
                      nullable=False)

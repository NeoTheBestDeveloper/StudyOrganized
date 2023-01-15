from datetime import datetime

from sqlalchemy import TIMESTAMP, Column, ForeignKey, \
        String, Integer, Table, Text

from ...database import Base

theme = Table(
    'theme',
    Base.metadata,
    Column('id', Integer, primary_key=True),
    Column('title', String(255), nullable=False),
    Column('short_description', String(255), nullable=True, default=''),
    Column('full_description', Text, nullable=True, default=''),
    Column('created_at', TIMESTAMP, default=datetime.utcnow),
    Column('user_id', Integer, ForeignKey('user.id', ondelete='cascade')),
)

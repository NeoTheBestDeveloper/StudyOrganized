from datetime import datetime

from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import \
        SQLAlchemyBaseAccessTokenTable
from sqlalchemy import Column, ForeignKey, Integer, String, JSON, TIMESTAMP, \
        Table, Boolean
from sqlalchemy.ext.declarative import declared_attr

from ..database import Base, declarative_base

FakeBase = declarative_base()

user = Table(
    "user",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String(320), nullable=False, unique=True, index=True),
    Column("name", String(255), nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow,
           nullable=False),
    Column("hashed_password", String(1024), nullable=False),
    Column('settings', JSON, nullable=False),
    Column("avatar_url", String(255), nullable=True),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow,
           nullable=False),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


class User(SQLAlchemyBaseUserTable[int], FakeBase):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)  # type: ignore
    email = Column(String(length=320), unique=True, index=True,
                   nullable=False)  # type: ignore
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(length=1024),
                             nullable=False)  # type: ignore
    settings = Column(JSON, default='{}', nullable=False)
    avatar_url = Column(String(255), nullable=True)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)  # type: ignore
    is_superuser = Column(Boolean, default=False,
                          nullable=False)  # type: ignore
    is_verified = Column(Boolean, default=False,
                         nullable=False)  # type: ignore


class AccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):

    @declared_attr
    def user_id(cls):
        return Column(Integer,
                      ForeignKey("user.id", ondelete="cascade"),
                      nullable=False)

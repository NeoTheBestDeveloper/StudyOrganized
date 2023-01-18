from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import \
        SQLAlchemyBaseAccessTokenTable
from sqlalchemy import Column, ForeignKey, Integer, String, JSON, TIMESTAMP, \
        Boolean
from sqlalchemy.sql import func, text

from ..database import Base, declarative_base

FakeBase = declarative_base()


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)  # type: ignore
    name = Column(String(255), nullable=False)
    email = Column(String(length=320), unique=True, index=True,
                   nullable=False)  # type: ignore
    hashed_password = Column(String(length=1024),
                             nullable=False)  # type: ignore
    settings = Column(JSON, server_default=text("'{}'::json"), nullable=False)
    avatar_file_path = Column(String(255), nullable=True)
    registered_at = Column(TIMESTAMP(timezone=True),
                           server_default=func.now(),
                           nullable=False)
    is_active = Column(Boolean, server_default='true',
                       nullable=False)  # type: ignore
    is_superuser = Column(Boolean, server_default='false',
                          nullable=False)  # type: ignore
    is_verified = Column(Boolean, server_default='false',
                         nullable=False)  # type: ignore


class AccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    token = Column(String(length=43), primary_key=True)  # type: ignore
    created_at = Column(
        TIMESTAMP(timezone=True),  # type: ignore
        index=True,
        nullable=False,
        server_default=func.now())

    user_id = Column(Integer,
                     ForeignKey("users.id", ondelete="cascade"),
                     nullable=False)  # type: ignore

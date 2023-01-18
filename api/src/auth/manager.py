from fastapi import Depends
from fastapi_users import BaseUserManager, IntegerIDMixin

from .models import User
from .dependencies import get_user_db
from ..config import SECRET_AUTH_KEY


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET_AUTH_KEY
    verification_token_secret = SECRET_AUTH_KEY


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)

from fastapi import Depends
from fastapi_users.authentication.strategy.db import \
        AccessTokenDatabase, DatabaseStrategy
from fastapi_users.authentication import AuthenticationBackend, BearerTransport
from fastapi_users import FastAPIUsers

from .dependencies import get_access_token_db
from .models import AccessToken, User
from .manager import get_user_manager
from .config import TOKEN_LIFTIME

bearer_transport = BearerTransport(tokenUrl="api/auth/token/login")


def get_database_strategy(
    access_token_db: AccessTokenDatabase[AccessToken] = Depends(
        get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=TOKEN_LIFTIME)


auth_backend = AuthenticationBackend(
    name="database_token",
    transport=bearer_transport,
    get_strategy=get_database_strategy,
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

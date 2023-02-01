from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from ..database import get_async_session

from .auth import auth_backend, fastapi_users, AccessToken
from .schemas import UserCreateSchema, UserReadSchema
from .models import User

router = APIRouter()

router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    tags=['Auth'],
    prefix='/api/auth/token',
)

router.include_router(
    fastapi_users.get_register_router(UserReadSchema, UserCreateSchema),
    tags=['Auth'],
    prefix='/api/auth',
)

current_user = fastapi_users.current_user()


@router.get("/api/users/me", tags=['Auth'])
def get_current_user(user: User = Depends(current_user)):
    return UserReadSchema.from_orm(user)


@router.get("/api/users/me/isauth", tags=['Auth'])
async def user_is_auth(
    request: Request, session: AsyncSession = Depends(get_async_session)
) -> JSONResponse:
    token = request.headers.get('Authorization', None)
    if token is None:
        return JSONResponse('false')
    token = token.split()[1]

    stmt = select(AccessToken).where(AccessToken.token == token)
    result = await session.execute(stmt)

    if result.scalars().first() is None:
        return JSONResponse('false')
    return JSONResponse('true')

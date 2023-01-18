from fastapi import APIRouter, Depends

from .auth import auth_backend, fastapi_users
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

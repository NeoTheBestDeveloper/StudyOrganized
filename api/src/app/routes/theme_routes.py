from enum import Enum

from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from ...auth import current_user, User
from ..schemas import ThemeSchema
from ..models import Theme
from ...database import get_async_session

themes_router = APIRouter(tags=['Themes'])


class ThemesType(Enum):
    SAVED = 'saved'
    SHOWN = 'shown'


@themes_router.get("/themes")
async def get_filtered_themes(
    title: str,
    limit: int = 10,
    offset: int = 0,
    session: AsyncSession = Depends(get_async_session)
) -> list[ThemeSchema]:
    query = select(Theme).where(
        func.lower(Theme.title).contains(
            title.lower())).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()


@themes_router.get("/users/me/themes")
async def get_saved_themes(
    type: ThemesType,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user)
) -> list[ThemeSchema]:
    if (type == ThemesType.SAVED):
        query = select(Theme).where(Theme.user_id == user.id)
        results = await session.execute(query)
        return results.scalars().all()
    else:
        return []


@themes_router.post("/themes")
async def create_theme(
    new_theme: ThemeSchema,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user)
) -> ThemeSchema:
    new_theme.user_id = user.id
    query = insert(Theme).values(
        new_theme.dict(exclude={'id', 'created_at'})).returning(Theme)
    print(query)
    result = await session.execute(query)
    await session.commit()
    return result.first()


@themes_router.get("/themes/{theme_id}")
async def get_theme(
    theme_id: int, session: AsyncSession = Depends(get_async_session)
) -> ThemeSchema:
    query = select(Theme).where(Theme.id == theme_id)
    result = await session.execute(query)
    return result.scalars().first()

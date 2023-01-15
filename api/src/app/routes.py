from fastapi import APIRouter, Depends
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth import current_user, User
from .schemas import ThemeSchema as Theme
from .schemas import ResourceSchema as Resource
from .models import resource, theme

from ..database import get_async_session

router = APIRouter(tags=['Api'], prefix='/api')


@router.get("/themes")
async def get_filtered_themes(
    title: str,
    limit: int = 10,
    offset: int = 0,
    session: AsyncSession = Depends(get_async_session)
) -> list[Theme]:
    query = select(theme.c).where(theme.c.title.contains(
        title.lower())).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.all()


@router.get("/themes/me/saved")
async def get_saved_themes(session: AsyncSession = Depends(get_async_session),
                           user: User = Depends(current_user)) -> list[Theme]:
    query = select(theme.c).where(theme.c.user_id == user.id)
    result = await session.execute(query)
    return result.all()


@router.get("/themes/me/shown")
async def get_shown_themes() -> list[Theme]:
    pass


@router.post("/themes")
async def create_theme(
    new_theme: Theme,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user)
) -> Theme:
    new_theme.user_id = user.id
    del new_theme.id
    query = insert(theme).values(new_theme.dict()).returning(theme)
    result = await session.execute(query)
    await session.commit()
    return result.first()


@router.get("/themes/{theme_id}")
async def get_theme(
    theme_id: int,
    session: AsyncSession = Depends(get_async_session)) -> Theme:
    query = select(theme.c).where(theme.c.id == theme_id)
    result = await session.execute(query)
    return result.first()


@router.get("/themes/{theme_id}/resources")
async def get_theme_resources(
    theme_id: int, session: AsyncSession = Depends(get_async_session)
) -> list[Resource]:
    query = select(resource.c).where(resource.c.theme_id == theme_id)
    result = await session.execute(query)
    return result.all()


@router.post("/resources")
async def create_resource(
    new_resource: Resource, session: AsyncSession = Depends(get_async_session)
) -> Resource:
    del new_resource.id
    query = insert(resource).values(new_resource.dict()).returning(resource)
    result = await session.execute(query)
    await session.commit()
    return result.first()


@router.get("/resources/{resource_id}")
async def get_resource(
    resource_id: int, session: AsyncSession = Depends(get_async_session)
) -> Resource:
    query = select(resource.c).where(resource.c.id == resource_id)
    result = await session.execute(query)
    return result.first()

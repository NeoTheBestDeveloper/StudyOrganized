from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import ResourceSchema
from ..models import Resource

from ...auth import current_user, User
from ...database import get_async_session

resources_router = APIRouter(tags=['Resources'])


@resources_router.get("/themes/{theme_id}/resources")
async def get_theme_resources(
    theme_id: int, session: AsyncSession = Depends(get_async_session)
) -> list[ResourceSchema]:
    query = select(Resource).where(Resource.theme_id == theme_id)
    result = await session.execute(query)
    return result.scalars().all()


@resources_router.post("/resources")
async def create_resource(
    new_resource: ResourceSchema,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session)
) -> ResourceSchema:
    new_resource.user_id = user.id
    query = insert(Resource).values(
        new_resource.dict(exclude={'id'})).returning(Resource)
    result = await session.execute(query)
    await session.commit()
    return result.first()


@resources_router.get("/resources/{resource_id}")
async def get_resource(
    resource_id: int, session: AsyncSession = Depends(get_async_session)
) -> ResourceSchema:
    query = select(Resource).where(Resource.id == resource_id)
    result = await session.execute(query)
    return result.scalars().first()


@resources_router.put("/resources/{resource_id}")
async def update_resource(resource_id: int,
                          new_resource: ResourceSchema,
                          session: AsyncSession = Depends(get_async_session)):
    query = update(Resource).values(
        title=new_resource.title,
        description=new_resource.description).where(Resource.id == resource_id)
    await session.execute(query)
    await session.commit()
    return {}


@resources_router.delete("/resources/{resource_id}")
async def delete_resource(resource_id: int,
                          session: AsyncSession = Depends(get_async_session)):
    query = delete(Resource).where(Resource.id == resource_id)
    await session.execute(query)
    await session.commit()
    return {}

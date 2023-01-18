from fastapi import APIRouter, Depends
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import ResourceSchema
from ..models import Resource

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
    session: AsyncSession = Depends(get_async_session)
) -> ResourceSchema:
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

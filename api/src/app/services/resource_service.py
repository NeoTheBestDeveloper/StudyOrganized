from typing import NoReturn

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select, insert, delete, update

from ...database import get_async_session
from ...auth import User, current_user
from ..models import Resource
from ..schemas import CreateResourceSchema, UpdateResourceSchema


class ResourceService:
    model: type[Resource]
    session: AsyncSession
    user: User

    def __init__(self, session: AsyncSession, user: User) -> None:
        self.model = Resource
        self.session = session
        self.user = user

    async def get_theme_resources(self,
                                  theme_id: int) -> list[Resource] | NoReturn:
        stmt = select(self.model).where(self.model.theme_id == theme_id)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def get_resource(self, resource_id: int) -> Resource | NoReturn:
        stmt = select(self.model).where(self.model.id == resource_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def create_resource(
            self, new_resource: CreateResourceSchema) -> Resource | NoReturn:
        stmt = insert(self.model).values({
            'user_id': self.user.id,
            **new_resource.dict()
        }).returning(self.model)

        result = await self.session.execute(stmt)
        await self.session.commit()

        new_resource_id = result.scalars().first()

        stmt = select(self.model).where(self.model.id == new_resource_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def update_resource(
            self, resource_id: int,
            new_data: UpdateResourceSchema) -> None | NoReturn:
        stmt = update(self.model).values(
            new_data.dict()).where(self.model.id == resource_id)
        await self.session.execute(stmt)

        return None

    async def delete_resource(self, resource_id: int) -> None | NoReturn:
        stmt = delete(self.model).where(self.model.id == resource_id)

        await self.session.execute(stmt)
        await self.session.commit()

        return None


def get_resource_service(session: AsyncSession = Depends(get_async_session),
                         user: User = Depends(
                             current_user)) -> ResourceService:
    return ResourceService(session, user)

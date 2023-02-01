from typing import NoReturn

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select, insert, delete, update, desc

from ...auth import User, current_user
from ..models import Resource, Theme
from ..schemas import CreateThemeSchema, UpdateThemeSchema
from ...database import get_async_session
from ..routes.query_params_types import ThemesFilterBy, OrderAscending


class ThemeService:
    user: User
    model: type[Theme]
    session: AsyncSession

    def __init__(self, session: AsyncSession, user: User) -> None:
        self.user = user
        self.model = Theme
        self.session = session

    async def get_theme_by_id(self, theme_id: int) -> Theme | NoReturn:
        stmt = select(self.model).where(self.model.id == theme_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def create_theme(
        self,
        new_theme: CreateThemeSchema,
    ) -> Theme | NoReturn:
        values = {'user_id': self.user.id, **new_theme.dict()}
        stmt = insert(self.model).values(values).returning(self.model)
        result = await self.session.execute(stmt)
        await self.session.commit()

        new_theme_id = result.scalars().first()
        stmt = select(self.model).where(self.model.id == new_theme_id)
        result = await self.session.execute(stmt)

        return result.scalars().first()

    async def delete_theme(self, theme_id: int) -> None | NoReturn:
        stmt = delete(self.model).where(self.model.id == theme_id)

        await self.session.execute(stmt)
        await self.session.commit()

        return None

    async def update_theme(self, theme_id: int,
                           new_theme: UpdateThemeSchema) -> None | NoReturn:
        stmt = update(self.model).values(
            new_theme.dict()).where(self.model.id == theme_id)

        await self.session.execute(stmt)
        await self.session.commit()

        return None

    async def get_saved_themes(self) -> list[Theme] | NoReturn:
        stmt = select(self.model).where(self.model.user_id == self.user.id)
        results = await self.session.execute(stmt)

        return results.scalars().all()

    def _get_filter_by_title_stmt(self, substr: str):
        return select(self.model).where(
            func.lower(self.model.title).contains(substr.lower()))

    def _get_filter_by_description_stmt(self, substr: str):
        return select(self.model).where(
            func.lower(self.model.description).contains(substr.lower()))

    def _get_filter_by_all_stmt(self, substr: str):
        return select(self.model).where(
            func.lower(self.model.title).contains(substr.lower())
            | func.lower(self.model.description).contains(substr.lower()))

    async def filter(self, key: ThemesFilterBy, substr: str, limit: int,
                     offset: int,
                     order: OrderAscending) -> list[Theme] | NoReturn:
        if key == ThemesFilterBy.TITLE:
            stmt = self._get_filter_by_title_stmt(substr)
        elif key == ThemesFilterBy.DESCRIPTION:
            stmt = self._get_filter_by_description_stmt(substr)
        else:
            stmt = self._get_filter_by_all_stmt(substr)

        # FIXME: Ordering by time don;t work, don't find themes with ordering.
        # if order == OrderAscending.ASC:
        #     stmt = stmt.where(self.model.description != '').limit(
        #         limit).offset(offset).order_by(self.model.created_at)
        # else:
        #     stmt = stmt.where(self.model.description != '').limit(
        #         limit).offset(offset).order_by(desc(self.model.created_at))

        result = await self.session.execute(stmt)
        themes: list[Theme] = result.scalars().all()
        return themes

    async def save_theme(self, theme_id: int) -> None | NoReturn:
        stmt = select(self.model).where(self.model.id == theme_id)
        result = await self.session.execute(stmt)
        theme: Theme = result.scalars().first()

        stmt = insert(self.model).values(
            dict(title=theme.title,
                 description=theme.description,
                 user_id=self.user.id)).returning(self.model)
        result = await self.session.execute(stmt)
        new_theme_id = result.scalars().first()

        stmt = select(Resource).where(Resource.theme_id == theme_id)
        result = await self.session.execute(stmt)
        resources: list[Resource] = result.scalars().all()

        processed_resources = [
            dict(
                title=r.title,
                description=r.description,
                user_id=self.user.id,
                theme_id=new_theme_id,
            ) for r in resources
        ]

        if processed_resources:
            stmt = insert(Resource).values(processed_resources)
            await self.session.execute(stmt)
        await self.session.commit()
        return None


def get_theme_service(session: AsyncSession = Depends(get_async_session),
                      user: User = Depends(current_user)) -> ThemeService:
    return ThemeService(session, user)

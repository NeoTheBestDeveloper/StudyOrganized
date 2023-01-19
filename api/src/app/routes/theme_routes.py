from enum import Enum

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ...auth import UserReadSchema
from ..schemas import CreateUpdateThemeSchema, ReadThemeSchema
from ..services import OrderAscending, ThemeService, get_theme_service, \
        ThemesFilterBy

themes_router = APIRouter(tags=['Themes'])


class ThemesType(Enum):
    SAVED = 'saved'
    SHOWN = 'shown'


@themes_router.get("/themes", response_model=list[ReadThemeSchema])
async def get_filtered_themes(
    value: str,
    key: ThemesFilterBy = ThemesFilterBy.ALL,
    order: OrderAscending = OrderAscending.DESC,
    limit: int = 10,
    offset: int = 0,
    theme_service: ThemeService = Depends(get_theme_service)):
    return await theme_service.filter(key, value, limit, offset, order)


@themes_router.get("/users/me/themes", response_model=list[ReadThemeSchema])
async def get_user_themes(
        type: ThemesType,
        theme_service: ThemeService = Depends(get_theme_service),
):
    if (type == ThemesType.SAVED):
        return await theme_service.get_saved_themes()
    else:
        return []


@themes_router.post("/themes", response_model=ReadThemeSchema)
async def create_theme(
        new_theme: CreateUpdateThemeSchema,
        theme_service: ThemeService = Depends(get_theme_service),
):
    return await theme_service.create_theme(new_theme)


@themes_router.get("/themes/{theme_id}", response_model=ReadThemeSchema)
async def get_theme(theme_id: int,
                    theme_service: ThemeService = Depends(get_theme_service)):
    result = await theme_service.get_theme_by_id(theme_id)
    return result


@themes_router.delete("/themes/{theme_id}")
async def delete_theme(
    theme_id: int,
    theme_service: ThemeService = Depends(get_theme_service),
) -> JSONResponse:
    await theme_service.delete_theme_by_id(theme_id)
    return JSONResponse({"status": "ok"})


@themes_router.put("/themes/{theme_id}")
async def update_theme(
    theme_id: int,
    new_theme: CreateUpdateThemeSchema,
    theme_service: ThemeService = Depends(get_theme_service)
) -> JSONResponse:
    await theme_service.update_theme(theme_id, new_theme)
    return JSONResponse({"status": "ok"})


@themes_router.post('/users/me/save/themes/{theme_id}')
async def save_theme(
    theme_id: int, theme_service: ThemeService = Depends(get_theme_service)
) -> JSONResponse:
    await theme_service.save_theme(theme_id)
    return JSONResponse({"status": "ok"})

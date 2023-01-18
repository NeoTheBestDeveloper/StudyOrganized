from fastapi import APIRouter

from .resource_routes import resources_router
from .theme_routes import themes_router

router = APIRouter(prefix='/api')
router.include_router(resources_router)
router.include_router(themes_router)

__all__ = ('router', )

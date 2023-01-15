from fastapi import FastAPI

from .config import DEBUG
from .app import router as api_router
from .auth import router as auth_router

openapi_url = '/api/openapi.json' if DEBUG else None

api = FastAPI(title="Study Organized",
              debug=DEBUG,
              docs_url='/api/docs',
              openapi_url=openapi_url)

api.include_router(api_router)
api.include_router(auth_router)

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from .config import DEBUG
from .app import router as api_router
from .auth import router as auth_router

openapi_url = '/api/openapi.json' if DEBUG else None

api = FastAPI(title="Study Organized",
              debug=DEBUG,
              docs_url='/api/docs',
              openapi_url=openapi_url)


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        print(e)
        return JSONResponse({"detail": "Internal server error"},
                            status_code=500)


api.middleware('http')(catch_exceptions_middleware)
api.include_router(api_router)
api.include_router(auth_router)

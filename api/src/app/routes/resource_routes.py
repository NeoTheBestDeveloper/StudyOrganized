from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..schemas import CreateResourceSchema, UpdateResourceSchema, \
        ReadResourceSchema
from ..services import ResourceService, get_resource_service

resources_router = APIRouter(tags=['Resources'])


@resources_router.get("/themes/{theme_id}/resources",
                      response_model=list[ReadResourceSchema])
async def get_theme_resources(
    theme_id: int,
    resource_service: ResourceService = Depends(get_resource_service)):
    return await resource_service.get_theme_resources(theme_id)


@resources_router.post("/resources", response_model=ReadResourceSchema)
async def create_resource(
    new_resource: CreateResourceSchema,
    resource_service: ResourceService = Depends(get_resource_service)):
    return await resource_service.create_resource(new_resource)


@resources_router.get("/resources/{resource_id}",
                      response_model=ReadResourceSchema)
async def get_resource(
    resource_id: int,
    resource_service: ResourceService = Depends(get_resource_service)):
    return await resource_service.get_resource(resource_id)


@resources_router.put("/resources/{resource_id}")
async def update_resource(
    resource_id: int,
    new_data: UpdateResourceSchema,
    resource_service: ResourceService = Depends(get_resource_service)
) -> JSONResponse:
    await resource_service.update_resource(resource_id, new_data)
    return JSONResponse({"status": "ok"})


@resources_router.delete("/resources/{resource_id}")
async def delete_resource(
    resource_id: int,
    resource_service: ResourceService = Depends(get_resource_service)
) -> JSONResponse:
    await resource_service.delete_resource(resource_id)
    return JSONResponse({"status": "ok"})

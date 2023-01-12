from django.db.models.manager import BaseManager

from ..serializers import ResourceSerializer


class ResourceRepository:
    model_manager: BaseManager

    def __init__(self, model_manager: BaseManager) -> None:
        self.model_manager = model_manager

    def get_resources(self, theme_id: int) -> dict:
        resource_objs = self.model_manager.filter(theme_id=theme_id)
        payload = {'resources': [], 'status': 'ok'}
        serializer = ResourceSerializer(resource_objs, many=True)
        payload['resources'] = serializer.data

        return payload

    def get_resource(self, resource_id: int) -> dict:
        resource = self.model_manager.filter(id=resource_id).first()
        serializer = ResourceSerializer(resource)
        payload = {'resource': serializer.data, 'status': 'ok'}

        return payload

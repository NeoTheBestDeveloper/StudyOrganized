from django.db.models.manager import BaseManager

from ..repository import ThemeRepository

from ..serializers import ResourceSerializer
from ..models import ExtentedUser, Theme


class ResourceService:
    model_manager: BaseManager

    def __init__(self, model_manager: BaseManager) -> None:
        self.model_manager = model_manager

    def create_resource(self, user: ExtentedUser, data: dict) -> dict:
        serializer = ResourceSerializer(data=data)

        if not serializer.is_valid():
            return {'status': 'Invalid resource data'}

        # theme = ThemeRepository(Theme.objects).get_theme(data.pop('theme_id'))
        resource = self.model_manager.create(**data, user=user)

        payload = {
            'resource': ResourceSerializer(resource).data,
            'status': 'ok'
        }

        return payload

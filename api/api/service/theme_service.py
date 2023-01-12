from django.db.models.manager import BaseManager

from ..serializers import ThemeSerializer
from ..models import ExtentedUser


class ThemeService:
    model_manager: BaseManager

    def __init__(self, model_manager: BaseManager) -> None:
        self.model_manager = model_manager

    def create_theme(self, user: ExtentedUser, data: dict) -> dict:
        serializer = ThemeSerializer(data=data)

        if not serializer.is_valid():
            return {'status': 'Invalid theme data'}

        theme = self.model_manager.create(**data, user=user)
        payload = {'theme': ThemeSerializer(theme).data, 'status': 'ok'}
        return payload

from enum import Enum
from django.db.models.manager import BaseManager

from ..serializers import ThemeSerializer
from ..models import ExtentedUser


class ThemeRepository:
    model_manager: BaseManager

    def __init__(self, model_manager: BaseManager) -> None:
        self.model_manager = model_manager

    def get_themes(self, user: ExtentedUser) -> dict:
        themes_objs = self.model_manager.filter(user=user)
        payload = {'themes': [], 'status': 'ok'}
        serializer = ThemeSerializer(themes_objs, many=True)
        payload['themes'] = serializer.data

        return payload

    def get_theme(self, theme_id: int) -> dict:
        theme = self.model_manager.filter(id=theme_id).first()
        serializer = ThemeSerializer(theme)
        payload = {'theme': serializer.data, 'status': 'ok'}
        return payload

    def filter_themes(self, title: str) -> dict:
        themes_objs = self.model_manager.filter(title__icontains=title)
        payload = {'themes': [], 'status': 'ok'}
        serializer = ThemeSerializer(themes_objs, many=True)
        payload['themes'] = serializer.data

        return payload

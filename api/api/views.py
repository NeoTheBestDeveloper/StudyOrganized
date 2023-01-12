from rest_framework.views import APIView, Request, Response

from .service import ResourceService, ThemeService
from .repository import ResourceRepository, ThemeRepository

from .models import Theme, Resource, ExtentedUser

OK_STATUS: str = 'ok'


class ThemesAPIView(APIView):

    def get(self, request: Request) -> Response:
        payload = ThemeRepository(Theme.objects).get_themes(request.user)
        return Response(payload)


class ThemeAPIView(APIView):

    def get(self, request: Request, theme_id: int) -> Response:
        payload = ThemeRepository(Theme.objects).get_theme(theme_id)
        return Response(payload)

    def post(self, request: Request) -> Response:
        payload = ThemeService(Theme.objects).create_theme(
            request.user, request.data)
        if (payload['status'] != OK_STATUS):
            response = Response(payload)
            response.status_code = 400
            return response
        return Response(payload)


class ResourcesAPIView(APIView):

    def get(self, request: Request, theme_id: int) -> Response:
        payload = ResourceRepository(Resource.objects).get_resources(theme_id)
        return Response(payload)


class ResourceAPIView(APIView):

    def get(self, request: Request, resource_id: int) -> Response:
        payload = ResourceRepository(
            Resource.objects).get_resource(resource_id)
        return Response(payload)

    def post(self, request: Request) -> Response:
        payload = ResourceService(Resource.objects).create_resource(
            request.user, request.data)
        if (payload['status'] != OK_STATUS):
            response = Response(payload)
            response.status_code = 400
            return response
        return Response(payload)

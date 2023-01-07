from rest_framework.views import APIView, Request, Response

from .serializers import *

__all__ = [
    'UserAPIView',
    'ThemeAPIView',
    'ResourceAPIView',
    'GoalAPIView',
    'TaskAPIView',
    'FlashCardAPIView',
    'TestAPIView',
    'QuestionAPIView',
]


class UserAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class ThemeAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class ResourceAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class GoalAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class TaskAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class FlashCardAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class TestAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass


class QuestionAPIView(APIView):

    def get(self, request: Request) -> Response:
        pass

    def post(self, request: Request) -> Response:
        pass

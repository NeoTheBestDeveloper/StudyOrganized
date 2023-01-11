import datetime
from time import time

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView, Request, Response

from api.models import ExtentedUser, Theme
from config.settings import SECRET_KEY
from .serializers import *

__all__ = [
    'UserAPIView',
    'ThemesAPIView',
    'ThemeAPIView',
    'ResourceAPIView',
    'GoalAPIView',
    'TaskAPIView',
    'FlashCardAPIView',
    'TestAPIView',
    'QuestionAPIView',
    'RegisterAPIView',
    'LoginAPIView',
    'LogoutAPIView',
]

# class RegisterAPIView(APIView):
#
#     def post(self, request: Request) -> Response:
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#
#
# class LoginAPIView(APIView):
#
#     def post(self, request: Request) -> Response:
#         email = request.data['email']
#         password = request.data['password']
#
#         user = ExtentedUser.objects.filter(email=email).first()
#
#         if user is None:
#             raise AuthenticationFailed('User not found.')
#
#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect password.')
#
#         payload = {
#             'id': user.id,
#         }
#
#         token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
#
#         response = Response()
#         response.set_cookie(key='jwt', value=token, httponly=True)
#         response.data = {'jwt': token}
#
#         return response
#

# class ThemesAPIView(APIView):
#
#     def get(self, request: Request) -> Response:
#         token = request.COOKIES.get('jwt')
#
#         if not token:
#             raise AuthenticationFailed("Not authenticated")
#
#         try:
#             payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("Not authenticated")
#
#         user = ExtentedUser.objects.filter(id=payload['id']).first()
#
#         themes = Theme.objects.filter(user=user)
#         payload = {'themes': []}
#         for theme in themes:
#             serializer = ThemeSerializer(theme)
#             payload['themes'].append(serializer.data)
#
#         return Response(payload)

# class ThemeAPIView(APIView):
#
#     def get(self, request: Request, id: int) -> Response:
#         theme = Theme.objects.filter(id=id).first()
#         serializer = ThemeSerializer(theme)
#         return Response(serializer.data)
#
#     def post(self, request: Request) -> Response:
#         token = request.COOKIES.get('jwt')
#
#         if not token:
#             raise AuthenticationFailed("Not authenticated")
#
#         try:
#             payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("Not authenticated")
#
#         user = ExtentedUser.objects.filter(id=payload['id']).first()
#         theme = Theme.objects.create(
#             user=user,
#             title=request.data['title'],
#             short_description=request.data['short_description'],
#             full_description=request.data['full_description'],
#         )
#
#         serializer = ThemeSerializer(theme)
#         return Response(serializer.data)

# class LogoutAPIView(APIView):
#
#     def post(self, request: Request) -> Response:
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {'msg': 'success'}
#         return response
#
#
# class UserAPIView(APIView):
#
#     def get(self, request: Request) -> Response:
#         token = request.COOKIES.get('jwt')
#
#         if not token:
#             raise AuthenticationFailed("Not authenticated")
#
#         try:
#             payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("Not authenticated")
#
#         user = ExtentedUser.objects.filter(id=payload['id']).first()
#         serializer = UserSerializer(user)
#
#         return Response(serializer.data)


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

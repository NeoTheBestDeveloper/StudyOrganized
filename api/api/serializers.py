from rest_framework.serializers import ModelSerializer

from .models import *

__all__ = [
    'UserSerializer',
    'ThemeSerializer',
    'ResourceSerializer',
    'GoalSerializer',
    'TaskSerializer',
    'FlashCardSerializer',
    'TestSerializer',
    'QuestionSerializer',
]


class UserSerializer(ModelSerializer):

    class Meta:
        model = User


class ThemeSerializer(ModelSerializer):

    class Meta:
        model = Theme


class ResourceSerializer(ModelSerializer):

    class Meta:
        model = Resource


class GoalSerializer(ModelSerializer):

    class Meta:
        model = Goal


class TaskSerializer(ModelSerializer):

    class Meta:
        model = Task


class FlashCardSerializer(ModelSerializer):

    class Meta:
        model = FlashCard


class TestSerializer(ModelSerializer):

    class Meta:
        model = Test


class QuestionSerializer(ModelSerializer):

    class Meta:
        model = Question

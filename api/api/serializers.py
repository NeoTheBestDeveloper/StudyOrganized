from rest_framework.serializers import ModelSerializer

from .models import ExtentedUser, Theme, Resource, \
    Task, Goal, Test, Question, FlashCard


class ExtentedUSerializer(ModelSerializer):

    class Meta:
        model = ExtentedUser
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True
            },
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ThemeSerializer(ModelSerializer):

    class Meta:
        model = Theme
        fields = 'id', 'title', 'full_description', 'short_description'


class ResourceSerializer(ModelSerializer):

    class Meta:
        model = Resource
        fields = 'id', 'title', 'full_description', 'short_description'


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

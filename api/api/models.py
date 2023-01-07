from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

__all__ = [
    'User',
    'Theme',
    'Resource',
    'Goal',
    'Task',
    'FlashCard',
    'Test',
    'Question',
]


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    create_date = models.DateTimeField(auto_now_add=True)
    avatar_url = models.CharField(max_length=255)
    settings = models.JSONField()


class Theme(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    short_description = models.TextField()
    full_description = models.TextField()


class Resource(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    create_date = models.DateTimeField(auto_now_add=True)
    short_description = models.TextField()
    full_description = models.TextField()


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    task_id = models.PositiveIntegerField()
    task_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    task = GenericForeignKey('task_type', 'task_id')
    create_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField()
    is_done = models.BooleanField()


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description_text = models.TextField()
    description_image_url = models.CharField(max_length=255)
    answer_text = models.TextField()
    answer_image_url = models.CharField(max_length=255)


class FlashCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    front = models.TextField()
    front_image_url = models.CharField(max_length=255)
    back = models.TextField()
    back_image_url = models.CharField(max_length=255)


class Test(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    decription = models.TextField()


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    answers = models.JSONField()
    right_answer = models.PositiveSmallIntegerField()

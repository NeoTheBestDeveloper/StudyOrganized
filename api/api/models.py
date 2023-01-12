from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class ExtentedUser(AbstractUser):
    name = models.CharField('user name', max_length=255)
    email = models.EmailField(('email address'), unique=True)
    password = models.CharField('password hash', max_length=255)
    create_date = models.DateTimeField('date, when user was created',
                                       auto_now_add=True)
    avatar_url = models.CharField('path to user avatar',
                                  max_length=255,
                                  blank=True,
                                  null=True)
    settings = models.JSONField('user srrings, which stored like json',
                                blank=True,
                                null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class Theme(models.Model):
    user = models.ForeignKey(ExtentedUser,
                             on_delete=models.CASCADE,
                             verbose_name='user, which saved this theme')
    create_date = models.DateTimeField('date, when theme was created',
                                       auto_now_add=True)
    title = models.CharField('theme title, will be shown at search',
                             max_length=255)
    short_description = models.TextField(
        'theme short description, will be shown at search',
        blank=True,
        null=True)
    full_description = models.TextField(
        'fulle theme description, will not be shown at search',
        blank=True,
        null=True)


class Resource(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    create_date = models.DateTimeField(auto_now_add=True)
    short_description = models.TextField()
    full_description = models.TextField()


class Goal(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    task_id = models.PositiveIntegerField()
    task_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    task = GenericForeignKey('task_type', 'task_id')
    create_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField()
    is_done = models.BooleanField()


class Task(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description_text = models.TextField()
    description_image_url = models.CharField(max_length=255)
    answer_text = models.TextField()
    answer_image_url = models.CharField(max_length=255)


class FlashCard(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    front = models.TextField()
    front_image_url = models.CharField(max_length=255)
    back = models.TextField()
    back_image_url = models.CharField(max_length=255)


class Test(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    decription = models.TextField()


class Question(models.Model):
    user = models.ForeignKey(ExtentedUser, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    answers = models.JSONField()
    right_answer = models.PositiveSmallIntegerField()

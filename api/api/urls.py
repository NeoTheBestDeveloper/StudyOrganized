from django.urls import include, path, re_path

urlpatterns = [
    # path('register', RegisterAPIView.as_view()),
    # path('themes', ThemesAPIView.as_view()),
    # path('theme/<id>', ThemeAPIView.as_view()),
    # path('theme', ThemeAPIView.as_view()),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

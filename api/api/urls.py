from django.urls import include, path, re_path

from .views import ThemeAPIView, ThemesAPIView, \
        ResourceAPIView, ResourcesAPIView

urlpatterns = [
    path('themes/', ThemesAPIView.as_view()),
    path('theme/<theme_id>', ThemeAPIView.as_view()),
    path('theme/', ThemeAPIView.as_view()),
    path('resources/<theme_id>', ResourcesAPIView.as_view()),
    path('resource/<resource_id>', ResourceAPIView.as_view()),
    path('resource/', ResourceAPIView.as_view()),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

from django.urls import path, include
import django_eventstream
from . import views

urlpatterns = [
    path('message/', views.messages),
    path('message/events/', include(django_eventstream.urls), {
        'format-channels': ['test-message']
    }),
]

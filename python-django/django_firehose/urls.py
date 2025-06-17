from django.urls import path
from receiver.views import webhook

urlpatterns = [
    path('webhook', webhook),
    path('webhook/<str:app_id>', webhook),
]

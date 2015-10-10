from django.conf.urls import include, url

from rest_framework import routers

from poster.views import PostViewSet
from poster.routers import PostCustomRouter


router = PostCustomRouter()
router.register(r'posts', PostViewSet)


urlpatterns = [

    # Login & Logout API by Django Rest Framework
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),

    # Rest of the urls for API
    url(r'^',
        include(router.urls, namespace='api')),

]

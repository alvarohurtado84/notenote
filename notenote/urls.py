from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [

    # Login & Logout API by Django Rest Framework
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),

    # Django Admin Panel urls
    url(r'^admin/',
        include(admin.site.urls)),

    # Rest of urls for Notenote
    url(r'^', include('poster.urls')),

]

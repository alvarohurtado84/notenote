from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import TemplateView


urlpatterns = [

    # Django Admin Panel urls
    url(r'^admin/',
        include(admin.site.urls)),

    # API urls
    url(r'api/',
        include('api.urls')),

    # Home Page
    url(r'^$',
        TemplateView.as_view(template_name='home.html'),
        name='home'),

    # Rest of urls for Notenote
    url(r'^', include('poster.urls')),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)

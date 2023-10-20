from django.contrib import admin
from django.urls import path, include

import accounts.views

urlpatterns = [
    path('login/', accounts.views.login, name='login'),
    path('admin/', admin.site.urls),
    path('', include('whenmeet.urls')),
    path('',accounts.views.home, name = "home"),
    path('', include('wheremeet.urls')),
    path('accounts/', include('accounts.urls')),
    path('auth/', include('allauth.urls')),
    path('wwmgroup/', include('wwmgroup.urls')),
]

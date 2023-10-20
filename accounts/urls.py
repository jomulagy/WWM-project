from django.urls import path
from . import views

app_name = "accounts"
urlpatterns = [
    path('user_grouplist/',views.user_grouplist, name='user_grouplist'),
    path('post_personal_timetable',views.post_personal_timetable, name='post_personal_timetable'),
    path('login/', views.login, name='login'),
]

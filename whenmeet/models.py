from django.db import models

class Timetable(models.Model):
    user = models.ForeignKey('accounts.User',on_delete=models.CASCADE)
    day = models.CharField(max_length=24)
    schedule = models.CharField(max_length=24)


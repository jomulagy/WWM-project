# Generated by Django 4.1 on 2022-08-15 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_user_avaliablity_days_time"),
    ]

    operations = [
        migrations.RemoveField(model_name="user", name="address",),
        migrations.AddField(
            model_name="user",
            name="latitude",
            field=models.FloatField(default=1, verbose_name="위도"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="user",
            name="longitude",
            field=models.FloatField(default=1, verbose_name="경도"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="user",
            name="avaliablity_days_time",
            field=models.TextField(verbose_name="meet 가능 시간"),
        ),
        migrations.AlterField(
            model_name="user",
            name="name",
            field=models.CharField(max_length=20, unique=True, verbose_name="사용자 이름"),
        ),
    ]
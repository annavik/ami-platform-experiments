# Generated by Django 4.2.2 on 2024-04-16 18:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0029_alter_deployment_device_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="identification",
            name="comment",
            field=models.TextField(blank=True),
        ),
    ]

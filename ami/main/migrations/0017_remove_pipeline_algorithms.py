# Generated by Django 4.2.2 on 2023-11-10 01:33

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0016_pipeline"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="pipeline",
            name="algorithms",
        ),
    ]

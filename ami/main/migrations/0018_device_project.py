# Generated by Django 4.2.2 on 2023-11-23 02:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0017_alter_site_options_site_project"),
    ]

    operations = [
        migrations.AddField(
            model_name="device",
            name="project",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="devices", to="main.project"
            ),
        ),
    ]

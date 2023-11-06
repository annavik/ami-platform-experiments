# Generated by Django 4.2.2 on 2023-11-02 02:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0003_job_pipeline"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="delay",
            field=models.IntegerField(
                default=0, help_text="Delay before running the job", verbose_name="Delay in seconds"
            ),
        ),
    ]

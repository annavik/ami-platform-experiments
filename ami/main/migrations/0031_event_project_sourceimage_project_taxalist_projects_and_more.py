# Generated by Django 4.2.2 on 2023-08-25 03:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0030_remove_sourceimage_main_source_event_i_6ca966_idx_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="project",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="events", to="main.project"
            ),
        ),
        migrations.AddField(
            model_name="sourceimage",
            name="project",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="captures", to="main.project"
            ),
        ),
        migrations.AddField(
            model_name="taxalist",
            name="projects",
            field=models.ManyToManyField(related_name="taxa_lists", to="main.project"),
        ),
        migrations.AddField(
            model_name="taxon",
            name="projects",
            field=models.ManyToManyField(related_name="taxa", to="main.project"),
        ),
    ]
# Generated by Django 4.2.2 on 2023-09-15 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0033_taxon_gbif_taxon_key_alter_taxon_parents_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="SourceImageCollection",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True)),
                (
                    "method",
                    models.CharField(
                        choices=[
                            ("random", "random"),
                            ("stratified_random", "stratified_random"),
                            ("interval", "interval"),
                            ("manual", "manual"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "kwargs",
                    models.JSONField(
                        blank=True,
                        help_text="Arguments passed to the sampling function",
                        null=True,
                        verbose_name="Arguments",
                    ),
                ),
                ("images", models.ManyToManyField(blank=True, related_name="collections", to="main.sourceimage")),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sourceimage_collections",
                        to="main.project",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
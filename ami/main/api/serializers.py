import datetime
import typing
import urllib.parse

from django.db.models import Count
from rest_framework import serializers
from rest_framework.request import Request
from rest_framework.reverse import reverse

from ami.users.models import User

from ..models import (
    Algorithm,
    Classification,
    Deployment,
    Detection,
    Event,
    Identification,
    Job,
    Occurrence,
    Page,
    Project,
    SourceImage,
    Taxon,
    user_agrees_with_identification,
)
from .permissions import add_object_level_permissions


def reverse_with_params(viewname: str, args=None, kwargs=None, request=None, params: dict = {}, **extra) -> str:
    query_string = urllib.parse.urlencode(params)
    base_url = reverse(viewname, request=request, args=args, kwargs=kwargs, **extra)
    url = urllib.parse.urlunsplit(("", "", base_url, query_string, ""))
    return url


def add_format_to_url(url: str, format: typing.Literal["json", "html", "csv"]) -> str:
    """
    Add a format suffix to a URL.

    This is a workaround for the DRF `format_suffix_patterns` decorator not working
    with the `reverse` function.
    """
    url_parts = urllib.parse.urlsplit(url)
    url_parts = url_parts._replace(path=f"{url_parts.path.rstrip('/')}.{format}")
    return urllib.parse.urlunsplit(url_parts)


def get_current_user(request: Request | None):
    if request:
        return request.user
    else:
        return None


class DefaultSerializer(serializers.HyperlinkedModelSerializer):
    url_field_name = "details"

    def get_permissions(self, instance_data):
        request = self.context.get("request")
        user = request.user if request else None
        return add_object_level_permissions(user, instance_data)

    def to_representation(self, instance):
        instance_data = super().to_representation(instance)
        instance_data = self.get_permissions(instance_data)
        return instance_data


class ProjectNestedSerializer(DefaultSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "image",
            "details",
        ]


class UserNestedSerializer(DefaultSerializer):
    details = serializers.HyperlinkedIdentityField(view_name="user-detail", lookup_field="pk", lookup_url_kwarg="id")

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "image",
            "details",
        ]


class SourceImageNestedSerializer(DefaultSerializer):
    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "url",
            "width",
            "height",
            "timestamp",
            # "detections_count",
            # "detections",
        ]


class DeploymentListSerializer(DefaultSerializer):
    events = serializers.SerializerMethodField()
    occurrences = serializers.SerializerMethodField()
    project = ProjectNestedSerializer(read_only=True)

    class Meta:
        model = Deployment
        queryset = Deployment.objects.annotate(
            events_count=Count("events"),
            occurrences_count=Count("occurrences"),
        )
        fields = [
            "id",
            "name",
            "details",
            "image",
            "events",
            "occurrences",
            "events_count",
            "captures_count",
            "occurrences_count",
            "taxa_count",
            "project",
            "created_at",
            "updated_at",
            "latitude",
            "longitude",
            "first_date",
            "last_date",
        ]

    def get_events(self, obj):
        """
        Return URL to the events endpoint filtered by this deployment.
        """

        return reverse_with_params(
            "event-list",
            request=self.context.get("request"),
            params={"deployment": obj.pk},
        )

    def get_occurrences(self, obj):
        """
        Return URL to the occurrences endpoint filtered by this deployment.
        """

        return reverse_with_params(
            "occurrence-list",
            request=self.context.get("request"),
            params={"deployment": obj.pk},
        )


class DeploymentEventNestedSerializer(DefaultSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "details",
            "occurrences_count",
            "taxa_count",
        ]


class DeploymentNestedSerializer(DefaultSerializer):
    class Meta:
        model = Deployment
        fields = [
            "id",
            "name",
            "details",
        ]


class DeploymentNestedSerializerWithLocationAndCounts(DefaultSerializer):
    class Meta:
        model = Deployment
        fields = [
            "id",
            "name",
            "image",
            "details",
            "latitude",
            "longitude",
            "events_count",
            # "captures_count",
            # "detections_count",
            # "occurrences_count",
            # "taxa_count",
        ]


class ProjectListSerializer(DefaultSerializer):
    deployments_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "details",
            "deployments_count",
            "created_at",
            "updated_at",
            "image",
        ]


class ProjectSerializer(DefaultSerializer):
    deployments = DeploymentNestedSerializerWithLocationAndCounts(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ProjectListSerializer.Meta.fields + [
            "deployments",
            "summary_data",  # @TODO move to a 2nd request, it's too slow
        ]


class SourceImageQuickListSerializer(DefaultSerializer):
    class Meta:
        model = SourceImage
        queryset = SourceImage.objects.annotate(detections_count=Count("detections"))
        fields = [
            "id",
            "details",
            "url",
            "timestamp",
            "detections_count",
        ]


class EventListSerializer(DefaultSerializer):
    deployment = DeploymentNestedSerializer(
        read_only=True,
    )
    example_captures = SourceImageNestedSerializer(many=True, read_only=True)
    # captures = serializers.StringRelatedField(many=True, read_only=True)
    captures = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "details",
            "deployment",
            "start",
            "end",
            "day",
            "date_label",
            "duration",
            "duration_label",
            "captures_count",
            "detections_count",
            "occurrences_count",
            "taxa_count",
            "captures",
            "example_captures",
        ]

    def get_captures(self, obj):
        """
        Return URL to the captures endpoint filtered by this event.
        """

        return reverse_with_params(
            "sourceimage-list",
            request=self.context.get("request"),
            params={"event": obj.pk},
        )


class EventNestedSerializer(DefaultSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "details",
            "date_label",
        ]


class DeploymentCaptureNestedSerializer(DefaultSerializer):
    event = EventNestedSerializer(read_only=True)

    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "url",
            "width",
            "height",
            "timestamp",
            "event",
        ]


class DeploymentSerializer(DeploymentListSerializer):
    events = DeploymentEventNestedSerializer(many=True, read_only=True)
    occurrences = serializers.SerializerMethodField()
    example_captures = DeploymentCaptureNestedSerializer(many=True, read_only=True)
    data_source = serializers.SerializerMethodField(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Project.objects.all(),
        source="project",
    )

    class Meta(DeploymentListSerializer.Meta):
        fields = DeploymentListSerializer.Meta.fields + [
            "project_id",
            "description",
            "data_source",
            "example_captures",
            # "capture_images",
        ]

    def get_data_source(self, obj):
        return obj.data_source_uri()

    def get_occurrences(self, obj):
        """
        Return URL to the occurrences endpoint filtered by this deployment.
        """

        return reverse_with_params(
            "occurrence-list",
            request=self.context.get("request"),
            params={"deployment": obj.pk},
        )


class TaxonNoParentNestedSerializer(DefaultSerializer):
    class Meta:
        model = Taxon
        fields = [
            "id",
            "name",
            "rank",
            "details",
        ]


class TaxonParentNestedSerializer(TaxonNoParentNestedSerializer):
    parent = TaxonNoParentNestedSerializer(read_only=True)

    class Meta(TaxonNoParentNestedSerializer.Meta):
        fields = TaxonNoParentNestedSerializer.Meta.fields + [
            "parent",
        ]


class TaxonNestedSerializer(TaxonParentNestedSerializer):
    """
    Simple Taxon serializer with 2 levels of nesting.
    """

    parent = TaxonParentNestedSerializer(read_only=True)

    class Meta(TaxonParentNestedSerializer.Meta):
        pass


class TaxonSearchResultSerializer(TaxonNestedSerializer):
    class Meta:
        model = Taxon
        fields = [
            "id",
            "name",
            "rank",
            "parent",
        ]


class TaxonListSerializer(DefaultSerializer):
    # latest_detection = DetectionNestedSerializer(read_only=True)
    occurrences = serializers.SerializerMethodField()
    parent = TaxonParentNestedSerializer(read_only=True)

    class Meta:
        model = Taxon
        fields = [
            "id",
            "name",
            "rank",
            "parent",
            "details",
            "occurrences_count",
            "detections_count",
            "occurrences",
            "occurrence_images",
            "last_detected",
        ]

    def get_occurrences(self, obj):
        """
        Return URL to the occurrences endpoint filtered by this taxon.
        """

        return reverse_with_params(
            "occurrence-list",
            request=self.context.get("request"),
            params={"determination": obj.pk},
        )


class CaptureTaxonSerializer(DefaultSerializer):
    parent = TaxonParentNestedSerializer(read_only=True)

    class Meta:
        model = Taxon
        fields = [
            "id",
            "name",
            "parent",
            "rank",
            "details",
        ]


class OccurrenceNestedSerializer(DefaultSerializer):
    determination = CaptureTaxonSerializer(read_only=True)

    class Meta:
        model = Occurrence
        # queryset = Occurrence.objects.annotate(
        #     determination_score=Max("detections__classsifications__score")
        # )
        fields = [
            "id",
            "details",
            "determination",
            # "determination_score",
        ]


class IdentificationSerializer(DefaultSerializer):
    user = UserNestedSerializer(read_only=True)
    occurrence = OccurrenceNestedSerializer(read_only=True)
    occurrence_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Occurrence.objects.all(),
        source="occurrence",
    )
    taxon = TaxonNestedSerializer(read_only=True)
    taxon_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Taxon.objects.all(),
        source="taxon",
    )
    agreed_with_identification_id = serializers.PrimaryKeyRelatedField(
        queryset=Identification.objects.all(),
        source="agreed_with_identification",
        allow_null=True,
        required=False,
    )
    agreed_with_prediction_id = serializers.PrimaryKeyRelatedField(
        queryset=Classification.objects.all(),
        source="agreed_with_prediction",
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Identification
        fields = [
            "id",
            "details",
            "user",
            "occurrence",
            "occurrence_id",
            "taxon",
            "taxon_id",
            "withdrawn",
            "agreed_with_identification_id",
            "agreed_with_prediction_id",
            "created_at",
            "updated_at",
        ]


class AlgorithmSerializer(DefaultSerializer):
    class Meta:
        model = Algorithm
        fields = ["id", "name", "version", "details", "created_at"]


class TaxonDetectionsSerializer(DefaultSerializer):
    class Meta:
        model = Detection
        # queryset = Detection.objects.prefetch_related("classifications")
        fields = [
            "id",
            "url",
            "timestamp",
            "details",
            "width",
            "height",
        ]


class TaxonSourceImageNestedSerializer(DefaultSerializer):
    page = serializers.SerializerMethodField()
    page_offset = serializers.SerializerMethodField()

    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "timestamp",
            "event",
            "page_offset",
            "page",
        ]

    def get_page(self, obj):
        return reverse_with_params(
            "sourceimage-list",
            request=self.context.get("request"),
            params={"offset": self.get_page_offset(obj)},
        )

    def get_page_offset(self, obj) -> int:
        # @TODO this may not be correct. Test or remove if unnecessary.
        # the Occurrence to Session navigation in the UI will be using
        # another method.
        return obj.event.captures.filter(timestamp__lt=obj.timestamp).count()


class TaxonOccurrenceNestedSerializer(DefaultSerializer):
    # determination_algorithm = AlgorithmSerializer(read_only=True)
    deployment = DeploymentNestedSerializer(read_only=True)
    event = EventNestedSerializer(read_only=True)
    best_detection = TaxonDetectionsSerializer(read_only=True)
    determination = CaptureTaxonSerializer(read_only=True)
    first_appearance = TaxonSourceImageNestedSerializer(read_only=True)
    last_appearance = TaxonSourceImageNestedSerializer(read_only=True)

    class Meta:
        model = Occurrence
        fields = [
            "id",
            "details",
            "deployment",
            "event",
            "determination_score",
            "determination",
            "best_detection",
            "detections_count",
            "duration",
            "duration_label",
            "first_appearance",
            "last_appearance",
        ]


class TaxonSerializer(DefaultSerializer):
    # latest_detection = DetectionNestedSerializer(read_only=True)
    occurrences = TaxonOccurrenceNestedSerializer(many=True, read_only=True)
    parent = TaxonNestedSerializer(read_only=True)
    parent_id = serializers.PrimaryKeyRelatedField(queryset=Taxon.objects.all(), source="parent", write_only=True)

    class Meta:
        model = Taxon
        fields = [
            "id",
            "name",
            "rank",
            "parent",
            "parent_id",
            "details",
            "occurrences_count",
            "detections_count",
            "events_count",
            "occurrences",
        ]


class CaptureOccurrenceSerializer(DefaultSerializer):
    determination = CaptureTaxonSerializer(read_only=True)
    determination_algorithm = AlgorithmSerializer(read_only=True)

    class Meta:
        model = Occurrence
        fields = [
            "id",
            "details",
            "determination",
            "determination_score",
            "determination_algorithm",
        ]


class ClassificationSerializer(DefaultSerializer):
    taxon = TaxonNestedSerializer(read_only=True)
    algorithm = AlgorithmSerializer(read_only=True)

    class Meta:
        model = Classification
        fields = [
            "id",
            "details",
            "taxon",
            "score",
            "algorithm",
            "created_at",
        ]


class OccurrenceClassificationSerializer(ClassificationSerializer):
    current_user_agrees = serializers.SerializerMethodField()

    class Meta(ClassificationSerializer.Meta):
        fields = ClassificationSerializer.Meta.fields + [
            "current_user_agrees",
        ]

    def get_current_user_agrees(self, obj: Classification) -> bool | None:
        current_user = get_current_user(self.context.get("request"))

        # Avoid extra queries since occurrence is already in the current request
        parent = self.parent.instance if self.parent else None
        occurrence: Occurrence | None = self.context.get("occurrence") or parent
        if current_user and occurrence:
            return user_agrees_with_identification(current_user, occurrence, obj.taxon)
        else:
            return None


class CaptureDetectionsSerializer(DefaultSerializer):
    occurrence = CaptureOccurrenceSerializer(read_only=True)
    classifications = serializers.SerializerMethodField()

    class Meta:
        model = Detection
        # queryset = Detection.objects.prefetch_related("classifications")
        fields = [
            "id",
            "url",
            "width",
            "height",
            "bbox",
            "occurrence",
            "classifications",
        ]

    def get_classifications(self, obj):
        """
        Return URL to the classifications endpoint filtered by this detection.
        """

        return reverse_with_params(
            "classification-list",
            request=self.context.get("request"),
            params={"detection": obj.pk},
        )


class DetectionCaptureNestedSerializer(DefaultSerializer):
    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "url",
            "width",
            "height",
        ]


class DetectionNestedSerializer(DefaultSerializer):
    classifications = ClassificationSerializer(many=True, read_only=True)
    capture = DetectionCaptureNestedSerializer(read_only=True, source="source_image")

    class Meta:
        model = Detection
        # queryset = Detection.objects.prefetch_related("classifications")
        fields = [
            "id",
            "timestamp",
            "url",
            "capture",
            "width",
            "height",
            "bbox",
            "occurrence",
            "classifications",
        ]


class DetectionListSerializer(DefaultSerializer):
    class Meta:
        model = Detection
        fields = [
            "id",
            "details",
            "bbox",
            "width",
            "height",
            # "top_n_classifications",
            "occurrence",
            "timestamp",
            "source_image",
            "detection_algorithm",
            "url",
        ]


class DetectionSerializer(DefaultSerializer):
    detection_algorithm = AlgorithmSerializer(read_only=True)
    detection_algorithm_id = serializers.PrimaryKeyRelatedField(
        queryset=Algorithm.objects.all(), source="detection_algorithm", write_only=True
    )

    class Meta:
        model = Detection
        fields = DetectionListSerializer.Meta.fields + [
            "source_image",
            "detection_algorithm",
            "detection_algorithm_id",
        ]


class SourceImageListSerializer(DefaultSerializer):
    detections_count = serializers.IntegerField(read_only=True)
    detections = CaptureDetectionsSerializer(many=True, read_only=True)
    # file = serializers.ImageField(allow_empty_file=False, use_url=True)

    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "deployment",
            "event",
            "url",
            # "thumbnail",
            "timestamp",
            "width",
            "height",
            "size",
            "detections_count",
            "detections",
        ]


class SourceImageSerializer(DefaultSerializer):
    detections_count = serializers.IntegerField(read_only=True)
    detections = CaptureDetectionsSerializer(many=True, read_only=True)
    # file = serializers.ImageField(allow_empty_file=False, use_url=True)

    class Meta:
        model = SourceImage
        fields = SourceImageListSerializer.Meta.fields + []


class OccurrenceIdentificationSerializer(DefaultSerializer):
    user = UserNestedSerializer(read_only=True)
    taxon = TaxonNestedSerializer(read_only=True)
    current_user_agrees = serializers.SerializerMethodField()

    class Meta:
        model = Identification
        fields = [
            "id",
            "details",
            "taxon",
            "user",
            "withdrawn",
            "current_user_agrees",
            "created_at",
        ]

    def get_current_user_agrees(self, obj: Identification) -> bool | None:
        current_user = get_current_user(self.context.get("request"))

        if current_user:
            # Avoid extra queries since occurrence is already in the current request
            parent = self.parent.instance if self.parent else None
            occurrence: Occurrence | None = self.context.get("occurrence") or parent or obj.occurrence
            return user_agrees_with_identification(current_user, occurrence, obj.taxon)
        else:
            return None


class OccurrenceListSerializer(DefaultSerializer):
    determination = CaptureTaxonSerializer(read_only=True)
    deployment = DeploymentNestedSerializer(read_only=True)
    event = EventNestedSerializer(read_only=True)
    first_appearance = TaxonSourceImageNestedSerializer(read_only=True)
    determination_details = serializers.SerializerMethodField()

    class Meta:
        model = Occurrence
        # queryset = Occurrence.objects.annotate(
        #     determination_score=Max("detections__classsifications__score")
        # )
        fields = [
            "id",
            "details",
            "event",
            "deployment",
            "first_appearance",
            "duration",
            "duration_label",
            "determination",
            "detections_count",
            "detection_images",
            "determination_score",
            "determination_details",
        ]

    def get_determination_details(self, obj: Occurrence):
        # @TODO add an equivalent method to the Occurrence model

        context = self.context
        current_user = get_current_user(context.get("request"))

        # Add this occurrence to the context so that the nested serializers can access it
        # the `parent` attribute is not available since we are manually instantiating the serializers
        context["occurrence"] = obj

        taxon = TaxonNestedSerializer(obj.determination, context=context).data if obj.determination else None
        if obj.best_identification:
            identification = OccurrenceIdentificationSerializer(obj.best_identification, context=context).data
        else:
            identification = None

        if identification or not obj.best_prediction:
            prediction = None
        else:
            prediction = OccurrenceClassificationSerializer(obj.best_prediction, context=context).data

        if current_user:
            current_user_agrees = user_agrees_with_identification(current_user, obj, obj.determination)
        else:
            current_user_agrees = None

        return dict(
            taxon=taxon,
            identification=identification,
            prediction=prediction,
            score=obj.determination_score(),
            current_user_agrees=current_user_agrees,
        )


class OccurrenceSerializer(OccurrenceListSerializer):
    determination = CaptureTaxonSerializer(read_only=True)
    determination_id = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Taxon.objects.all(), source="determination"
    )
    detections = DetectionNestedSerializer(many=True, read_only=True)
    identifications = OccurrenceIdentificationSerializer(many=True, read_only=True)
    predictions = OccurrenceClassificationSerializer(many=True, read_only=True)
    deployment = DeploymentNestedSerializer(read_only=True)
    event = EventNestedSerializer(read_only=True)
    first_appearance = TaxonSourceImageNestedSerializer(read_only=True)

    class Meta:
        model = Occurrence
        fields = OccurrenceListSerializer.Meta.fields + [
            "determination_id",
            "detections",
            "identifications",
            "predictions",
        ]


class EventCaptureNestedSerializer(DefaultSerializer):
    """
    Load the first capture for an event. Or @TODO a single capture from the URL params.
    """

    detections = CaptureDetectionsSerializer(many=True, read_only=True)

    class Meta:
        model = SourceImage
        fields = [
            "id",
            "details",
            "url",
            "width",
            "height",
            "timestamp",
            "detections_count",
            "detections",
            # "page_url",
        ]


class EventSerializer(DefaultSerializer):
    deployment = DeploymentNestedSerializer(
        read_only=True,
    )
    deployment_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Deployment.objects.all(),
        source="deployment",
    )
    captures = serializers.SerializerMethodField()
    first_capture = EventCaptureNestedSerializer(read_only=True)
    start = serializers.DateTimeField(read_only=True)
    end = serializers.DateTimeField(read_only=True)
    capture_page_offset = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "details",
            "deployment",
            "deployment_id",
            "start",
            "end",
            "day",
            "date_label",
            "duration",
            "duration_label",
            "captures_count",
            "detections_count",
            "occurrences_count",
            "stats",
            "taxa_count",
            "captures",
            "first_capture",
            "summary_data",
            "capture_page_offset",
        ]

    def get_captures(self, obj):
        """
        Return URL to the captures endpoint filtered by this event.
        """

        params = {"event": obj.pk, "ordering": "timestamp"}

        initial_offset = self.get_capture_page_offset(obj)
        if initial_offset:
            params["offset"] = initial_offset

        return reverse_with_params(
            "sourceimage-list",
            request=self.context.get("request"),
            params=params,
        )

    def get_capture_page_offset(self, obj) -> int | None:
        """
        Look up the source image (capture) that contains a specfic detection or occurrence.

        Return the page offset for the capture to be used when requesting the capture list endpoint.
        """
        request = self.context["request"]
        event = obj
        capture_with_subject = None

        occurrence_id = request.query_params.get("occurrence")
        detection_id = request.query_params.get("detection")
        capture_id = request.query_params.get("capture")
        timestamp = request.query_params.get("timestamp")

        if capture_id:
            capture_with_subject = SourceImage.objects.get(pk=capture_id)
        elif timestamp:
            timestamp = datetime.datetime.fromisoformat(timestamp)
            capture_with_subject = event.captures.filter(timestamp=timestamp).first()
        elif detection_id:
            capture_with_subject = Detection.objects.get(pk=detection_id).source_image
        elif occurrence_id:
            capture_with_subject = Occurrence.objects.get(pk=occurrence_id).first_appearance

        if capture_with_subject and capture_with_subject.event:
            # Assert that the capture is part of the event
            # @TODO add logging and return 404 if not found
            assert capture_with_subject.event.pk == event.pk, (
                f"Capture {capture_with_subject.pk} is not part of Event {event.pk} "
                f"(It belongs to Event {capture_with_subject.event.pk})"
            )
            # This is only reliable if the captures are ordered by timestamp. Which is the default sort order.
            offset = SourceImage.objects.filter(event=event, timestamp__lt=capture_with_subject.timestamp).count()
        else:
            offset = request.query_params.get("offset", None)

        return offset


class JobListSerializer(DefaultSerializer):
    project = ProjectNestedSerializer(read_only=True)
    deployment = DeploymentNestedSerializer(read_only=True)

    class Meta:
        model = Job
        fields = [
            "id",
            "details",
            "name",
            "project",
            "deployment",
            "status",
            "progress",
            "started_at",
            "finished_at",
            # "duration",
            # "duration_label",
            # "progress",
            # "progress_label",
            # "progress_percent",
            # "progress_percent_label",
        ]


class JobSerializer(DefaultSerializer):
    project = ProjectNestedSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source="project")
    config = serializers.JSONField(initial=Job.default_config(), allow_null=False, required=False)
    progress = serializers.JSONField(initial=Job.default_progress(), allow_null=False, required=False)

    class Meta:
        model = Job
        fields = JobListSerializer.Meta.fields + [
            "config",
            "result",
            "project",
            "project_id",
        ]


class StorageStatusSerializer(serializers.Serializer):
    data_source = serializers.CharField(max_length=200)


class PageSerializer(DefaultSerializer):
    details = serializers.HyperlinkedIdentityField(view_name="page-detail", lookup_field="slug")

    class Meta:
        model = Page
        fields = [
            "id",
            "details",
            "name",
            "slug",
            "content",
            "html",
            "nav_level",
            "nav_order",
            "link_class",
            "published",
            "updated_at",
        ]


class PageListSerializer(PageSerializer):
    class Meta:
        model = Page
        queryset = Page.objects.filter(published=True)  # This has no effect
        fields = [
            "id",
            "details",
            "name",
            "slug",
            "nav_level",
            "nav_order",
            "link_class",
            "published",
            "updated_at",
        ]

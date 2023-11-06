import { getFormatedDateTimeString } from 'utils/date/getFormatedDateTimeString/getFormatedDateTimeString'
import { STRING, translate } from 'utils/language'

export type ServerJob = any // TODO: Update this type

export enum JobStatus {
  Created = 'created',
  Pending = 'pending',
  Started = 'started',
  Success = 'success',
  Unknown = 'unknown',
}

export class Job {
  protected readonly _job: ServerJob

  public constructor(job: ServerJob) {
    this._job = job
  }

  get finishedAt(): string | undefined {
    if (!this._job.finished_at) {
      return
    }

    return getFormatedDateTimeString({ date: new Date(this._job.finished_at) })
  }

  get id(): string {
    return `${this._job.id}`
  }

  get startedAt(): string | undefined {
    if (!this._job.started_at) {
      return
    }

    return getFormatedDateTimeString({ date: new Date(this._job.started_at) })
  }

  get name(): string {
    return this._job.name
  }

  get project(): string {
    return this._job.project.name
  }

  get status(): JobStatus {
    return this.getStatus(this._job.status)
  }

  get statusDetails(): string {
    return this._job.progress?.summary.status_label
  }

  get statusValue(): number {
    return this._job.progress?.summary.progress ?? this._job.status
  }

  get statusLabel(): string {
    return this.getStatusLabel(this.status)
  }

  protected getStatus(status: string): JobStatus {
    switch (status) {
      case 'CREATED':
        return JobStatus.Created
      case 'PENDING':
        return JobStatus.Pending
      case 'STARTED':
        return JobStatus.Started
      case 'SUCCESS':
        return JobStatus.Success
      default:
        return JobStatus.Unknown
    }
  }

  protected getStatusLabel(status: JobStatus): string {
    switch (status) {
      case JobStatus.Created:
        return translate(STRING.CREATED)
      case JobStatus.Pending:
        return translate(STRING.PENDING)
      case JobStatus.Started:
        return translate(STRING.RUNNING)
      case JobStatus.Success:
        return translate(STRING.DONE)
      default:
        return translate(STRING.UNKNOWN)
    }
  }
}

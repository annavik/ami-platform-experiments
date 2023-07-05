type CollectionType =
  | 'jobs'
  | 'deployments'
  | 'sessions'
  | 'occurrences'
  | 'species'

type FilterType = 'deployment' | 'event' | 'determination' | 'occurrences__deployment' | 'occurrences__event'

export const getRoute = ({
  collection,
  itemId,
  filters = {},
}: {
  collection: CollectionType
  itemId?: string
  filters?: Partial<Record<FilterType, string>>
}) => {
  let url = `/${collection}`

  if (itemId?.length) {
    url = `${url}/${itemId}`
  }

  const queryString = new URLSearchParams(filters).toString()
  if (queryString.length) {
    url = `${url}?${queryString}`
  }

  return url
}
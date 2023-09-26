import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_ROUTES, API_URL } from 'data-services/constants'
import { getAuthHeader } from 'data-services/utils'
import { useUser } from 'utils/user/userContext'

const convertToServerFieldValues = (fieldValues: any) => ({
  occurrence_id: fieldValues.occurrenceId,
  taxon_id: fieldValues.taxonId,
})

export const useCreateIdentification = (onSuccess?: () => void) => {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: (fieldValues: any) =>
      axios.post(
        `${API_URL}/${API_ROUTES.IDENTIFICATIONS}/`,
        convertToServerFieldValues(fieldValues),
        {
          headers: getAuthHeader(user),
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([API_ROUTES.IDENTIFICATIONS])
      queryClient.invalidateQueries([API_ROUTES.OCCURRENCES])
      onSuccess?.()
    },
  })

  return { createIdentification: mutateAsync, isLoading, error }
}
import { useCreateDeployment } from 'data-services/hooks/deployments/useCreateDeployment'
import { DeploymentDetails } from 'data-services/models/deployment-details'
import { Button, ButtonTheme } from 'design-system/components/button/button'
import * as Dialog from 'design-system/components/dialog/dialog'
import { useState } from 'react'
import { STRING, translate } from 'utils/language'
import { DeploymentDetailsForm } from './deployment-details-form/deployment-details-form'

const newDeployment = new DeploymentDetails({
  id: 'new-deployment',
})

export const NewDeploymentDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { createDeployment, isLoading, error } = useCreateDeployment()

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button
          label={translate(STRING.DETAILS_LABEL_NEW_DEPLOYMENT)}
          theme={ButtonTheme.Plain}
        />
      </Dialog.Trigger>
      <Dialog.Content ariaCloselabel={translate(STRING.CLOSE)}>
        <DeploymentDetailsForm
          deployment={newDeployment}
          isLoading={isLoading}
          title={translate(STRING.DETAILS_LABEL_NEW_DEPLOYMENT)}
          onCancelClick={() => setIsOpen(false)}
          onSubmit={async (data) => {
            await createDeployment(data)
            if (!error) {
              setIsOpen(false)
            }
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}
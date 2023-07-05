import { DeploymentDetails } from 'data-services/models/deployment-details'
import { Button } from 'design-system/components/button/button'
import * as Dialog from 'design-system/components/dialog/dialog'
import { ImageCarousel } from 'design-system/components/image-carousel/image-carousel'
import { InputValue } from 'design-system/components/input/input'
import { MultiMarkerMap } from 'design-system/map/multi-marker-map/multi-marker-map'
import { MarkerPosition } from 'design-system/map/types'
import { useMemo } from 'react'
import { STRING, translate } from 'utils/language'
import { ConnectionStatus } from './connection-status/connection-status'
import { useConnectionStatus } from './connection-status/useConnectionStatus'
import styles from './styles.module.scss'

export const DeploymentDetailsInfo = ({
  deployment,
  title,
  onEditClick,
}: {
  deployment: DeploymentDetails
  title: string
  onEditClick: () => void
}) => {
  const { status, refreshStatus, lastUpdated } = useConnectionStatus(
    deployment.path
  )

  const markers = useMemo(
    () => [
      {
        position: new MarkerPosition(deployment.latitude, deployment.longitude),
      },
    ],
    [deployment]
  )

  return (
    <>
      <Dialog.Header title={title}>
        <div className={styles.buttonWrapper}>
          <Button label={translate(STRING.EDIT)} onClick={onEditClick} />
        </div>
      </Dialog.Header>
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {translate(STRING.DETAILS_LABEL_GENERAL)}
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.sectionRow}>
              <InputValue
                label={translate(STRING.DETAILS_LABEL_DEPLOYMENT_ID)}
                value={deployment.id}
              />
              <InputValue
                label={translate(STRING.DETAILS_LABEL_NAME)}
                value={deployment.name}
              />
            </div>
            <div className={styles.sectionRow}>
              <InputValue
                label={translate(STRING.DETAILS_LABEL_DEVICE)}
                value="WIP"
              />
              <InputValue
                label={translate(STRING.DETAILS_LABEL_SITE)}
                value="WIP"
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {translate(STRING.DETAILS_LABEL_LOCATION)}
          </h2>
          <div className={styles.sectionContent}>
            <MultiMarkerMap markers={markers} />
            <div className={styles.sectionRow}>
              <InputValue
                label={translate(STRING.DETAILS_LABEL_LATITUDE)}
                value={deployment.latitude}
              />
              <InputValue
                label={translate(STRING.DETAILS_LABEL_LONGITUDE)}
                value={deployment.longitude}
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {translate(STRING.DETAILS_LABEL_SOURCE_IMAGES)}
          </h2>
          <div className={styles.sectionContent}>
            <div className={styles.sectionRow}>
              <InputValue
                label={translate(STRING.DETAILS_LABEL_PATH)}
                value={deployment.path}
              />
              <ConnectionStatus
                status={status}
                onRefreshClick={refreshStatus}
                lastUpdated={lastUpdated}
              />
            </div>
            <div className={styles.sectionRow}>
              <InputValue
                label={translate(STRING.DETAILS_LABEL_IMAGES)}
                value={deployment.numImages}
              />
              <InputValue
                label={translate(STRING.DETAILS_LABEL_EXAMPLE_CAPTURES)}
                value={deployment.exampleCaptures.length}
              />
            </div>
            <div className={styles.exampleCapturesContainer}>
              <ImageCarousel
                images={deployment.exampleCaptures}
                size={{ width: '100%', ratio: 16 / 9 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
import { Gallery } from 'components/gallery/gallery'
import { Project } from 'data-services/models/project'
import { Button } from 'design-system/components/button/button'
import { Card, CardSize } from 'design-system/components/card/card'
import { DeleteProjectDialog } from 'pages/project-details/delete-project-dialog'
import { EditProjectDialog } from 'pages/project-details/edit-project-dialog'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from 'utils/constants'
import styles from './projects.module.scss'

export const ProjectGallery = ({
  projects = [],
  isLoading,
}: {
  projects?: Project[]
  isLoading: boolean
}) => {
  const navigate = useNavigate()
  const items = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        image: p.image
          ? {
              src: p.image,
            }
          : undefined,
        title: p.name,
        subTitle: p.description,
        to: APP_ROUTES.PROJECT_DETAILS({ projectId: p.id }),
      })),
    [projects]
  )

  return (
    <Gallery
      cardSize={CardSize.Large}
      isLoading={isLoading}
      items={items}
      renderItem={(item) => (
        <Card
          key={item.id}
          title={item.title}
          subTitle={item.subTitle}
          image={item.image}
          size={CardSize.Large}
          to={item.to}
        >
          <div className={styles.projectActions}>
            <DeleteProjectDialog id={item.id} />
            <EditProjectDialog id={item.id} />
            <Button label="View project" onClick={() => navigate(item.to)} />
          </div>
        </Card>
      )}
      style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
    />
  )
}

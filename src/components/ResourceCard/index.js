import {
  ResourcesCard,
  IconAndTitleContainer,
  CardIcon,
  CardTitle,
  CardDescription,
  CardLink,
} from './styledComponents'

const ResourceCard = props => {
  const {resourceDetails} = props
  const {title, link, description, iconUrl} = resourceDetails
  return (
    <ResourcesCard>
      <IconAndTitleContainer>
        <CardIcon src={iconUrl} alt="icon" />
        <>
          <CardTitle>{title}</CardTitle>
        </>
      </IconAndTitleContainer>
      <CardLink href={link}>{link}</CardLink>
      <CardDescription>{description}</CardDescription>
    </ResourcesCard>
  )
}

export default ResourceCard

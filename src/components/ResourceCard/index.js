import {
  ResourcesCard,
  IconAndTitleContainer,
  CardIcon,
  CardTitleCategoryContainer,
  CardTitle,
  CardDescription,
  CardLink,
  CardCategory,
} from './styledComponents'

const ResourceCard = props => {
  const {resourceDetails} = props
  const {title, link, description, category, iconUrl} = resourceDetails
  return (
    <ResourcesCard>
      <IconAndTitleContainer>
        <CardIcon src={iconUrl} alt="icon" />
        <CardTitleCategoryContainer>
          <CardTitle>{title}</CardTitle>
          <CardCategory>{category}</CardCategory>
        </CardTitleCategoryContainer>
      </IconAndTitleContainer>
      <CardLink href={link}>{link}</CardLink>
      <CardDescription>{description}</CardDescription>
    </ResourcesCard>
  )
}

export default ResourceCard

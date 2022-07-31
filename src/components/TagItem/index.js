import {TagListItem, TagButton} from './styledComponents'

const TagItem = props => {
  const {tagDetails, activeTag, onClickResourceTag} = props
  const {displayText, tag} = tagDetails
  const onClickTag = () => {
    onClickResourceTag(tag)
  }
  return (
    <TagListItem onClick={onClickTag}>
      <TagButton type="button" isActive={activeTag === tag}>
        {displayText}
      </TagButton>
    </TagListItem>
  )
}

export default TagItem

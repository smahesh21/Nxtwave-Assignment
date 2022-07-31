import styled from 'styled-components'

export const TagListItem = styled.li``
export const TagButton = styled.button`
  height: 30px;
  width: 150px;
  outline: none;
  border: 1px solid #bacad1;
  color: ${props => (props.isActive ? '#ffffff' : '#171F46')};
  background-color: ${props => (props.isActive ? '#0B69FF' : '#D7DFE9')};
`

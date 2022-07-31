import styled from 'styled-components'

export const HomeMainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
`
export const HomeResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  padding-top: 20px;
`

export const TagsContainer = styled.div`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TagListItem = styled.li``
export const TagButton = styled.button`
  height: 30px;
  width: 150px;
  outline: none;
  border: 1px solid #bacad1;
  color: ${props => (props.isActive ? '#ffffff' : '#171F46')};
  background-color: ${props => (props.isActive ? '#0B69FF' : '#D7DFE9')};
`

export const SearchContainer = styled.div`
  height: 30px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid #d7dfe9;
  background-color: #ffffff;
  margin-top: 20px;
  margin-left: 10px;
  padding-left: 10px;
  align-self: flex-start;
`
export const SearchElement = styled.input`
  height: 90%;
  width: 100%;
  outline: none;
  cursor: pointer;
  border: none;
  background: transparent;
`

export const LoaderContainer = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ResourceCardsContainer = styled.ul`
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 0px;
`
export const FailureViewContainer = styled.div`
  height: 25vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FailureHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #171f46;
`

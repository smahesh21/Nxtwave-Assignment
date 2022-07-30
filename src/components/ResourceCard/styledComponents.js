import styled from 'styled-components'

export const ResourcesCard = styled.li`
  min-height: 150px;
  max-height: 200px;
  width: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d7dfe9;
  background-color: #ffffff;
  margin: 10px;
  padding: 16px;
`

export const IconAndTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const CardIcon = styled.img`
  height: 50px;
  width: 50px;
  border: 2px solid #d7dfe9;
  padding: 5px;
`
export const CardTitle = styled.h1`
  font-family: 'Roboto';
  font-size: 18px;
  margin-left: 10px;
`

export const CardLink = styled.a`
  text-decoration: none;
  margin-top: 16px;
`

export const CardDescription = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
`

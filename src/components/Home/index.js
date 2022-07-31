
import {Component} from 'react'

import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import ResourceCard from '../ResourceCard'

import {
  ResourceCardsContainer,
  TagsContainer,
  TagListItem,
  TagButton,
  HomeMainContainer,
  HomeResponsiveContainer,
  SearchContainer,
  SearchElement,
  LoaderContainer,
  FailureViewContainer,
  FailureHeading,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const tagsList = [
  {
    id: 1,
    displayText: 'Resources',
    tag: 'resources',
    isActive: false,
  },
  {
    id: 2,
    displayText: 'Requests',
    tag: 'request',
    isActive: false,
  },
  {
    id: 3,
    displayText: 'Users',
    tag: 'user',
    isActive: false,
  },
]

class Home extends Component {
  state = {
    resourcesList: [],
    activeTag: tagsList[0].tag,
    apiStatus: apiStatusConstants.initial,
    errorMessage: '',
    userInput: '',
  }

  componentDidMount() {
    this.getResourcesData()
  }

  onClickResourceTag = tag => {
    this.setState({activeTag: tag})
  }

  onChangeSearchText = event => {
    this.setState({userInput: event.target.value})
  }

  getResourcesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const resourcesUrl =
      'https://media-content.ccbp.in/website/react-assignment/resources.json'
    const response = await fetch(resourcesUrl)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const formattedData = fetchedData.map(eachResource => ({
        category: eachResource.category,
        description: eachResource.description,
        id: eachResource.id,
        iconUrl: eachResource.icon_url,
        link: eachResource.link,
        title: eachResource.title,
        tag: eachResource.tag,
      }))
      console.log(formattedData)
      this.setState({
        resourcesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorMessage: response.status,
      })
    }
  }

  renderTagsSection = () => {
    const {activeTag} = this.state
    return (
      <TagsContainer>
        {tagsList.map(eachTag => {
          const {displayText, tag} = eachTag
          const onClickTag = () => {
            this.onClickResourceTag(tag)
          }
          return (
            <TagListItem onClick={onClickTag}>
              <TagButton type="button" isActive={activeTag === tag}>
                {displayText}
              </TagButton>
            </TagListItem>
          )
        })}
      </TagsContainer>
    )
  }

  renderSearchElementSection = () => {
    const {userInput} = this.state
    return (
      <SearchContainer>
        <AiOutlineSearch size={16} />
        <SearchElement
          type="search"
          value={userInput}
          onChange={this.onChangeSearchText}
        />
      </SearchContainer>
    )
  }

  renderLoader = () => (
    <LoaderContainer>
      <Loader type="TailSpin" width={50} height={50} color="#3b63f5" />
    </LoaderContainer>
  )

  renderResourcesCards = () => {
    const {resourcesList, activeTag, userInput} = this.state

    const filteredList =
      activeTag === 'resources'
        ? resourcesList
        : resourcesList.filter(eachResource => eachResource.tag === activeTag)

    const filteredListByName = resourcesList.filter(resource =>
      resource.title.toLowerCase().includes(userInput.toLowerCase()),
    )

    return (
      <ResourceCardsContainer>
        {userInput.length === 0
          ? filteredList.map(resourceDetails => (
              <ResourceCard
                resourceDetails={resourceDetails}
                key={resourceDetails.id}
              />
            ))
          : filteredListByName.map(resourceDetails => (
              <ResourceCard
                resourceDetails={resourceDetails}
                key={resourceDetails.id}
              />
            ))}
      </ResourceCardsContainer>
    )
  }

  renderFailureView = () => {
    const {errorMessage} = this.state
    return (
      <FailureViewContainer>
        <FailureHeading>
          Error: Something went wrong status code {errorMessage}
        </FailureHeading>
      </FailureViewContainer>
    )
  }

  renderResourcesCardsBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderResourcesCards()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeMainContainer>
        <HomeResponsiveContainer>
          {this.renderTagsSection()}
          {this.renderSearchElementSection()}
          {this.renderResourcesCardsBasedOnApiStatus()}
        </HomeResponsiveContainer>
      </HomeMainContainer>
    )
  }
}

export default Home

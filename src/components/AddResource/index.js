import {Component} from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {
  AddResourceHomeContainer,
  AddResourceResponsiveContainer,
  CardDetailsFillContainer,
  UserContainer,
  FormContainer,
  Heading,
  FormElement,
  LabelElement,
  InputElement,
  BreakElement,
  CreateButton,
  ImageContainer,
  Image,
  UserTextButton,
  NameElementError,
  LinkElementError,
  DescriptionElementError,
  ButtonContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AddResource extends Component {
  state = {
    addResourceList: [],
    apiStatus: apiStatusConstants.initial,
    userInputName: '',
    userInputLink: '',
    userInputDescription: '',
    isEmptyText: false,
  }

  componentDidMount() {
    this.getResourceData()
  }

  onChangeName = event => {
    this.setState({userInputName: event.target.value})
  }

  onChangeLink = event => {
    this.setState({userInputLink: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({userInputDescription: event.target.value})
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {userInputName, userInputLink, userInputDescription} = this.state
    let newResource = null
    if (
      userInputName.length === 0 ||
      userInputLink.length === 0 ||
      userInputDescription.length === 0
    ) {
      this.setState(prevState => ({isEmptyText: !prevState.isEmptyText}))
    } else {
      newResource = {
        id: uuidv4(),
        name: userInputName,
        link: userInputLink,
        description: userInputDescription,
      }
      this.setState(prevState => ({
        addResourceList: [...prevState.addResourceList, newResource],
        userInputName: '',
        userInputLink: '',
        userInputDescription: '',
      }))
    }
  }

  getResourceData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const addResourceUrl =
      'https://media-content.ccbp.in/website/react-assignment/add_resource.json'
    const response = await fetch(addResourceUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        addResourcesList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {
      userInputName,
      userInputLink,
      userInputDescription,
      isEmptyText,
      addResourceList,
    } = this.state
    console.log(addResourceList)
    return (
      <AddResourceHomeContainer>
        <AddResourceResponsiveContainer>
          <CardDetailsFillContainer>
            <UserContainer>
              <Link to="/">
                <UserTextButton type="button">&lt; User</UserTextButton>
              </Link>
            </UserContainer>
            <FormContainer>
              <Heading>Add a Resource</Heading>

              <FormElement onSubmit={this.onClickSubmit}>
                <LabelElement htmlFor="name">NAME</LabelElement>
                <BreakElement />
                <InputElement
                  type="text"
                  id="name"
                  value={userInputName}
                  onChange={this.onChangeName}
                  placeholder="Enter the Name"
                />
                <BreakElement />
                {isEmptyText && userInputName.length === 0 && (
                  <NameElementError>*Name is required</NameElementError>
                )}
                <LabelElement htmlFor="link">LINK</LabelElement>
                <BreakElement />
                <InputElement
                  type="text"
                  id="link"
                  value={userInputLink}
                  onChange={this.onChangeLink}
                  placeholder="Enter the Link"
                />
                <BreakElement />
                {isEmptyText && userInputLink.length === 0 && (
                  <LinkElementError>*Link is required</LinkElementError>
                )}
                <LabelElement htmlFor="description">DESCRIPTION</LabelElement>
                <BreakElement />
                <InputElement
                  type="text"
                  id="description"
                  value={userInputDescription}
                  onChange={this.onChangeDescription}
                  placeholder="Enter the description"
                />
                <BreakElement />
                {isEmptyText && userInputDescription.length === 0 && (
                  <DescriptionElementError>
                    *Description is required
                  </DescriptionElementError>
                )}
                <ButtonContainer>
                  <CreateButton type="submit">Create</CreateButton>
                </ButtonContainer>
              </FormElement>
            </FormContainer>
          </CardDetailsFillContainer>
          <ImageContainer>
            <Image
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1659184818/image_9_gdviru.png"
              alt="image"
            />
          </ImageContainer>
        </AddResourceResponsiveContainer>
      </AddResourceHomeContainer>
    )
  }
}

export default AddResource

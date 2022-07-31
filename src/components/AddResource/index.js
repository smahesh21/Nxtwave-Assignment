import {Component} from 'react'
import {Link} from 'react-router-dom'
import {ToastContainer, toast, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BsUpload} from 'react-icons/bs'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'
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
  ErrorMessageElement,
  ButtonContainer,
  AddResourceLoaderContainer,
  AddResourceFailureViewContainer,
  AddResourceFailureHeading,
  ImageUploadInputElement,
  DescriptionInputElement,
  ImageUploadContainer,
} from './styledComponents'
import './index.css'

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
    userInputImage: '',
    isNameEmpty: false,
    isLinkEmpty: false,
    isDescriptionEmpty: false,
    isImageEmpty: false,
    changeImage: false,
  }

  componentDidMount() {
    this.getResourceData()
  }

  onBlurName = () => {
    const {userInputName} = this.state
    if (userInputName === '') {
      this.setState({isNameEmpty: true})
    }
  }

  onBlurLink = () => {
    const {userInputLink} = this.state
    if (userInputLink === '') {
      this.setState({isLinkEmpty: true})
    }
  }

  onBlurDescription = () => {
    const {userInputDescription} = this.state
    if (userInputDescription === '') {
      this.setState({isDescriptionEmpty: true})
    }
  }

  onBlurImage = () => {
    const {userInputImage} = this.state
    if (userInputImage === '') {
      this.setState({isImageEmpty: true})
    }
  }

  onChangeName = event => {
    this.setState({userInputName: event.target.value})
    if (event.target.value === '') {
      this.setState({isNameEmpty: true})
    }
  }

  onChangeLink = event => {
    this.setState({userInputLink: event.target.value})
    if (event.target.value === '') {
      this.setState({isLinkEmpty: true})
    }
  }

  onChangeDescription = event => {
    this.setState({userInputDescription: event.target.value})
    if (event.target.value === '') {
      this.setState({isDescriptionEmpty: true})
    }
  }

  onChangeImage = event => {
    this.setState({userInputImage: event.target.value})
    this.setState(prevState => ({changeImage: !prevState.changeImage}))
    if (event.target.value === '') {
      this.setState({isImageEmpty: true})
    }
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {
      userInputName,
      userInputLink,
      userInputDescription,
      userInputImage,
    } = this.state

    let newResource
    if (
      userInputName === '' ||
      userInputImage === '' ||
      userInputDescription === '' ||
      userInputLink === ''
    ) {
      newResource = null
      toast('Error: Check the validations once again', {
        className: 'error-toast',
        draggable: true,
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } else if (userInputName === '') {
      this.setState({isNameEmpty: true})
    } else if (userInputLink === '') {
      this.setState({isLinkEmpty: true})
    } else if (userInputDescription === '') {
      this.setState({isDescriptionEmpty: true})
    } else if (userInputImage === '') {
      this.setState({isImageEmpty: true})
    } else if (
      userInputName !== '' &&
      userInputLink !== '' &&
      userInputDescription !== '' &&
      userInputImage !== ''
    ) {
      newResource = {
        id: uuidv4(),
        name: userInputName,
        link: userInputLink,
        description: userInputDescription,
        imageUrl: userInputImage,
      }
      this.setState(prevState => ({
        addResourceList: [...prevState.addResourceList, newResource],
        userInputName: '',
        userInputLink: '',
        userInputDescription: '',
        userInputImage: '',
        isNameEmpty: false,
        isLinkEmpty: false,
        isDescriptionEmpty: false,
        isImageEmpty: false,
      }))
      toast('Added Successfully', {
        className: 'success-toast',
        draggable: true,
        position: toast.POSITION.BOTTOM_CENTER,
      })
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

  renderAddResourceUISection = () => {
    const {
      userInputName,
      userInputLink,
      userInputDescription,
      userInputImage,
      addResourceList,
      isNameEmpty,
      isImageEmpty,
      isDescriptionEmpty,
      isLinkEmpty,
      changeImage,
    } = this.state

    console.log(addResourceList)

    return (
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
                onBlur={this.onBlurName}
                placeholder="Enter the Name"
              />
              <BreakElement />
              {isNameEmpty && (
                <ErrorMessageElement>Name is required*</ErrorMessageElement>
              )}
              <LabelElement htmlFor="link">LINK</LabelElement>
              <BreakElement />
              <InputElement
                type="text"
                id="link"
                value={userInputLink}
                onChange={this.onChangeLink}
                onBlur={this.onBlurLink}
                placeholder="Enter the Link"
              />
              <BreakElement />
              {isLinkEmpty && (
                <ErrorMessageElement>Link is required*</ErrorMessageElement>
              )}

              <LabelElement htmlFor="description">DESCRIPTION</LabelElement>
              <BreakElement />
              <DescriptionInputElement
                type="text"
                id="description"
                rows="4"
                cols="68"
                value={userInputDescription}
                onChange={this.onChangeDescription}
                onBlur={this.onBlurDescription}
                placeholder="Ex. Building a new connectivity platform for the team"
              >
                {userInputDescription}
              </DescriptionInputElement>
              <BreakElement />
              {isDescriptionEmpty && (
                <ErrorMessageElement>
                  Description is required*
                </ErrorMessageElement>
              )}
              <BreakElement />
              <ImageUploadContainer>
                <ImageUploadInputElement
                  type="file"
                  id="file"
                  value={userInputImage}
                  onChange={this.onChangeImage}
                  onBlur={this.onBlurImage}
                  accept=".png"
                />
                <LabelElement htmlFor="file">
                  <BsUpload size={16} /> {changeImage ? 'Change' : 'Upload'}
                </LabelElement>
              </ImageUploadContainer>
              {isImageEmpty && (
                <ErrorMessageElement>Image is required*</ErrorMessageElement>
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
    )
  }

  renderAddResourceLoader = () => (
    <AddResourceLoaderContainer>
      <Loader type="TailSpin" width={50} height={50} color="#3b63f5" />
    </AddResourceLoaderContainer>
  )

  renderAddResourceFailureView = () => (
    <AddResourceFailureViewContainer>
      <AddResourceFailureHeading>
        Something went wrong
      </AddResourceFailureHeading>
    </AddResourceFailureViewContainer>
  )

  renderAddResourceDisplaySectionBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderAddResourceLoader()
      case apiStatusConstants.success:
        return this.renderAddResourceUISection()
      case apiStatusConstants.failure:
        return this.renderAddResourceFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <AddResourceHomeContainer>
        {this.renderAddResourceDisplaySectionBasedOnApiStatus()}
        <>
          <ToastContainer
            draggable={false}
            transition={Zoom}
            autoClose={8000}
          />
        </>
      </AddResourceHomeContainer>
    )
  }
}

export default AddResource

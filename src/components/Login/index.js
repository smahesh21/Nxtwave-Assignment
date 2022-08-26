import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginFormContainer,
  FormContainer,
  LoginWebsiteLogo,
  InputContainer,
  LoginButton,
  UserNameInputField,
  PasswordInputField,
  InputLabel,
  ErrorMessage,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    mobileNumber: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeMobileNumber = event => {
    this.setState({mobileNumber: event.target.value})
  }

  onSubmitSuccess = number => {
    const {history} = this.props

    Cookies.set('token', number, {
      expires: 10,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({
      showSubmitError: true,
      errorMsg: 'Invalid username or mobileNumber',
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, mobileNumber} = this.state

    const nameValidation = function onlyAlphabets(word) {
      return /^[A-Za-z]*$/.test(word)
    }

    const isValidUserName = nameValidation(username)

    const isMobileNumberValid =
      mobileNumber.length === 10 &&
      (mobileNumber.startsWith('9') ||
        mobileNumber.startsWith('8') ||
        mobileNumber.startsWith('7') ||
        mobileNumber.startsWith('6'))

    if (isValidUserName && isMobileNumberValid) {
      this.onSubmitSuccess(mobileNumber)
    } else {
      this.onSubmitFailure()
    }
  }

  renderMobileNumberField = () => {
    const {mobileNumber} = this.state
    return (
      <>
        <InputLabel htmlFor="number">Mobile Number</InputLabel>
        <PasswordInputField
          type="number"
          id="number"
          value={mobileNumber}
          onChange={this.onChangeMobileNumber}
          placeholder="10 digits number starts with 9 or 8 or 7 or 6"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <InputLabel htmlFor="username">NAME</InputLabel>
        <UserNameInputField
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Name (only alphabets)"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const token = Cookies.get('token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginFormContainer>
        <FormContainer onSubmit={this.submitForm}>
          <LoginWebsiteLogo
            src="https://res.cloudinary.com/diocftr6t/image/upload/v1659098876/NxtWave_TM_Coloured_logo_1NxtWaveLogo_rzlh25.png"
            alt="website logo"
          />
          <InputContainer>{this.renderUsernameField()}</InputContainer>
          <InputContainer>{this.renderMobileNumberField()}</InputContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showSubmitError && <ErrorMessage>*{errorMsg}</ErrorMessage>}
        </FormContainer>
      </LoginFormContainer>
    )
  }
}

export default Login

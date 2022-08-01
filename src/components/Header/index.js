import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  HeaderMainContainer,
  HeaderResponsiveContainer,
  WebsiteLogo,
  AddButtonProfileLogoContainer,
  AddButton,
  ProfileLogo,
  LogoutButton,
} from './styledComponents'

class Header extends Component {
  state = {isClickedAddButton: false}

  onClickAddButton = () => {
    this.setState(prevState => ({
      isClickedAddButton: !prevState.isClickedAddButton,
    }))
    Cookies.set('addButtonClicked', true, {expires: 10})
  }

  onClickProfileIcon = () => {
    this.setState(prevState => ({
      isClickedAddButton: !prevState.isClickedAddButton,
    }))
    const {history} = this.props
    Cookies.remove('token')
    Cookies.set('addButtonClicked', false, {expires: 10})
    history.replace('/login')
  }

  render() {
    const isClicked = Cookies.get('addButtonClicked')
    console.log(`isClicked: ${isClicked}`)
    return (
      <HeaderMainContainer>
        <HeaderResponsiveContainer>
          <WebsiteLogo
            src="https://res.cloudinary.com/diocftr6t/image/upload/v1659098876/NxtWave_TM_Coloured_logo_1NxtWaveLogo_rzlh25.png"
            className="website-logo"
            alt="website logo"
          />
          <AddButtonProfileLogoContainer>
            <Link to="./addResource">
              <AddButton
                type="button"
                isClicked={isClicked}
                onClick={this.onClickAddButton}
              >
                + Add
              </AddButton>
            </Link>
            <LogoutButton type="button" onClick={this.onClickProfileIcon}>
              <ProfileLogo
                src="https://res.cloudinary.com/diocftr6t/image/upload/v1659098900/imageProfile_cuohku.png"
                className="profile-logo"
                alt="profile logo"
              />
            </LogoutButton>
          </AddButtonProfileLogoContainer>
        </HeaderResponsiveContainer>
      </HeaderMainContainer>
    )
  }
}

export default withRouter(Header)

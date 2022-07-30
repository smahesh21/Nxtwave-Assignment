import {Link, withRouter} from 'react-router-dom'
import {
  HeaderMainContainer,
  HeaderResponsiveContainer,
  WebsiteLogo,
  AddButtonProfileLogoContainer,
  AddButton,
  ProfileLogo,
} from './styledComponents'

const Header = () => (
  <HeaderMainContainer>
    <HeaderResponsiveContainer>
      <WebsiteLogo
        src="https://res.cloudinary.com/diocftr6t/image/upload/v1659098876/NxtWave_TM_Coloured_logo_1NxtWaveLogo_rzlh25.png"
        className="website-logo"
        alt="website logo"
      />
      <AddButtonProfileLogoContainer>
        <Link to="./addResource">
          <AddButton type="button">+ Add</AddButton>
        </Link>
        <ProfileLogo
          src="https://res.cloudinary.com/diocftr6t/image/upload/v1659098900/imageProfile_cuohku.png"
          className="profile-logo"
          alt="profile logo"
        />
      </AddButtonProfileLogoContainer>
    </HeaderResponsiveContainer>
  </HeaderMainContainer>
)

export default withRouter(Header)

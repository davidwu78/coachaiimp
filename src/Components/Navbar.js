import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'Themes/components/Link';
import { connect } from 'react-redux';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import Auth from './Auth';

const googleSignOut = async () => {
  const url = `${process.env.REACT_APP_API_URL}/logout_callback`;
  await axios.post(url);
  Auth.setCookie('role');
  Auth.setCookie('id_token');
  window.location.href = '/';
};

const Navbar = styled.div`
  display: flex;
  align-items: center;
  background-color: #2b2b2b;
  width: 100%;
  height: 70px;
  padding: .5rem 10%;
  z-index: 10;
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: ${(props) => props.theme.textWhite};
`;

const BrandLink = styled(Link)`
  margin-left: 40px;
`;

const StyledLink = styled(Link)`
  font-size: 17px;
  padding: 0 7px;
  margin: 10px;
  color: ${(props) => props.theme.textWhite};
  
  :hover{
    color: ${(props) => props.theme.primary};
    transition: all 0.5s;
  }
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;
const role = Auth.getCookie('role')
const roleList = role.split(',')
const roleId = Auth.getCookie('role_id');
const roleIdList = roleId.split(',');
const combinedRoles = roleList.map((option, index) => ({
  role: option,
  roleId: roleIdList[index]
}));
console.log(combinedRoles)
const handleRoleChange = (event) => {
  const selectedKey = event.target.value;
  Auth.setCookie('current_group', selectedKey);
  const roleIdList = Auth.getCookie('role_id').split(',');
  const roleIdx = roleIdList.indexOf(selectedKey);
  Auth.setCookie('current_group_level', Auth.getCookie('role_level').split(',')[roleIdx]);
  window.location.href = '/';
};
const currentGroup = Auth.getCookie('current_group');
const defaultGroup = combinedRoles.find((option) => option.roleId === currentGroup);

const defaultGroupId = defaultGroup ? defaultGroup.roleId : '';
const RoleDropdown = () => (
  <select value={defaultGroupId} onChange={handleRoleChange}>
    {combinedRoles.map((option) => (
      <option key={option.roleId} value={option.roleId}>
        {option.role}
      </option>
    ))}
  </select>
);


class NavbarCustom extends PureComponent {
  render() {
    const { t } = this.props;

    return (
      <Navbar>
        <BrandLink to="/">
          <Logo>CoachAI</Logo>
        </BrandLink>
        <LinksWrapper>
          {
            this.props.currentUser.isAnonymous ? (
              <StyledLink to={`${process.env.REACT_APP_ROOT}/login`}>{t('login')}</StyledLink>
            ) : (
              <>
                <StyledLink to="/visualization">{t('matchList')}</StyledLink>
                <StyledLink to="/pattern">{t('playersComparison')}</StyledLink>
                <GoogleLogout
                  render={(renderProps) => (
                    <StyledLink to="#" onClick={renderProps.onClick}>{t('logout')}</StyledLink>
                  )}
                  clientId={Auth.clientId()}
                  onLogoutSuccess={googleSignOut}
                />
                <RoleDropdown />
              </>
            )
          }
        </LinksWrapper>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user
});

export default withTranslation()(connect(mapStateToProps)(NavbarCustom));

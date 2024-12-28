import React, { Component } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';

import styled from 'styled-components';
import background from 'Themes/pngs/all_bg.png';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PrivatePage from './Components/PrivateRoute';
import { updateUserInfo } from './Redux/reducers/user';
import Auth from './Components/Auth';
import NavbarCustom from './Components/Navbar';
import Footer from './Components/Footer';
import BackToTop from './Components/BackToTop';
import * as Page from './Pages';
import { current } from '@reduxjs/toolkit';

const Content = styled.div`
  margin-bottom: 180px;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  min-height: ${window.innerHeight - 270}px;
  box-sizing: border-box;
`;

const mapDispatch = { updateUserInfo };
const mapStateToProps = (state) => ({
  currentUser: state.user
});

class Router extends Component {
  componentDidMount() {
    const role = Auth.getRole();
    const idToken = "103235926321821091411";
    const currentGroup = Auth.getCurrentGroup();
    const roleId = Auth.getRoleId();
    if (role !== null || idToken !== null) {
      this.props.updateUserInfo({
        role: role,
        idToken: idToken,
        currentGroup: currentGroup,
        roleId:roleId,
        isAnonymous: false
      });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{ position: 'relative' }}>
          <Route path="/" component={NavbarCustom} />
          <Content>
            <Switch>
              <Redirect exact from="/" to="/single/302/Anders_ANTONSEN_SHI_Yu_Qi_Malasia_Open_2024_F/MALAYSIA%20OPEN%202024&KUALA%20LUMPUR&Finals&2024-01-14&Anders%20ANTONSEN&SHI%20Yuqi" />
              <PrivatePage exact path="/single/:matchId/:matchName/:matchInfo" component={Page.Single} />
              <PrivatePage path="*" render={() => (
              <Redirect to="/single/302/Anders_ANTONSEN_SHI_Yu_Qi_Malasia_Open_2024_F/MALAYSIA%20OPEN%202024&KUALA%20LUMPUR&Finals&2024-01-14&Anders%20ANTONSEN&SHI%20Yuqi" />
            )} />
            </Switch>
          </Content>
          <Route path="/" component={Footer} />
          <Route path="/" component={BackToTop} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatch)(Router));

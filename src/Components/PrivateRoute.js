import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.user
});

class PrivateRoute extends PureComponent {
  render() {
    const { isAnonymous } = this.props.currentUser;
    if (isAnonymous) {
      return this.props.publicComponent ? <this.props.publicComponent /> : null;
    }
    return <Route {...this.props} />;
  }
}

export default connect(mapStateToProps)(PrivateRoute);

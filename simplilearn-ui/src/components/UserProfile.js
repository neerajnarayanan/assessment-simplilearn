import React from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';

const UserProfile = props => {
  const {currentUser, token} =  props;
  console.log('check man', props);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser?.userName.toUpperCase()}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong>{token && token.substring(0, 20)} ...{' '}
        {/* {currentUser?.tokens?.access?.token.substr(currentUser?.tokens?.access?.token.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong> {currentUser?._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser?.email}
      </p>
    </div>
  );
};

const  mapStateToProps = (state) => {
  const { user } = state
  return { currentUser: user?.data.user, token: user?.token }
}
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserProfile));

import React, { useState, useRef, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomTextField from '../sharedcomponents/TextField';
import CustomButton from '../sharedcomponents/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { addUser } from '../services/auth.service'
import ToastComponent from '../sharedcomponents/Toast'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '0.5px solid rgba(0, 0, 0, 0.87)',
    padding: '25px',
    height: '418px',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignUp = (props) => {
  const { history,registerUser, isError, errorMessage, isSuccess, successMessage } = props;
  const classes = useStyles();
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    console.log('errorMessage', errorMessage)
    if (!isError && errorMessage !== '') { setuserName(''); setEmail(''); setPassword(''); }
  }, [isError, errorMessage]);

  const handleSubmit = () => {
    let userObj = {
      userName,
      email,
      password
    };
    registerUser(userObj);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm
          // ref="form"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <CustomTextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value={userName}
                validators={['required']}
                errorMessages={['Username is required']}
                handleChange={e => setuserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['Email is required', 'Invalid Email']}
                handleChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                validators={['required']}
                errorMessages={['Password is required']}
                value={password}
                handleChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <CustomButton
            disabled={submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            btnTxt="Sign Up"
          />
        </ValidatorForm>

        <Grid container justify="flex-end">
          <Grid item>
            <Link onClick={() => history.push('/sign-in')} style={{ cursor: 'pointer' }} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        {/* {isError && <ToastComponent message={errorMessage} />}
        {isSuccess && <ToastComponent message={successMessage} />} */}
      </div>
      {isSuccess && (
            <div className="form-group">
              <div
                className={isSuccess ? 'alert alert-success' : 'alert alert-danger'}
                role="alert"
              >
                SUCCESS, YOU CAN NOW LOGIN USING YOUR CREDENTIALS
              </div>
            </div>
          )}
           {isError && (
            <div className="form-group">
              <div
                className={isError ? 'alert alert-danger' :'alert alert-success'}
                role="alert"
              >
                {errorMessage}
              </div>
            </div>
          )}
    </Container>
  );
}


const mapStateToProps = state => {
  const { user } = state;
  console.log('mapStateToProps triggered', user);
  return {
    isError: user?.isError,
    errorMessage: user?.errMessage,
    successMessage: user?.successMsg,
    isSuccess: user?.isSuccess,
  }
}
const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(addUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
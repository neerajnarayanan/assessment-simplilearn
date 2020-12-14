import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomTextField from '../sharedcomponents/TextField';
import CustomButton from '../sharedcomponents/Button';
import {loginUser} from '../services/auth.service'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitAlign : {
    position: 'relative',
    top: '94px'
  }
}));

const SignIn = props => {
  const {login, history} = props;
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    let userObj = {
      email,
      password
    };
    login(userObj, history);

}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm className={classes.form}
            onSubmit={handleSubmit}>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            validators={['required','isEmail']}
            errorMessages={['Email is required','Invalid Email']}
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
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
          <div className={classes.submitAlign}>
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            btnTxt="Sign In"
          />
          <Grid container>
          <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </div>
        </ValidatorForm>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  login: (userObj, history) => dispatch(loginUser(userObj, history))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignIn));


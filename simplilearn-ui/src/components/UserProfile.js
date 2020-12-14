import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getCurrentUser } from '../services/auth.service';
import Button from '@material-ui/core/Button';
import { ActionCreators } from '../actions/actionCreators';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));




const UserProfile = ({clearUserInfo,history}) => {
  const classes = useStyles();
  const currentUser = getCurrentUser();
  console.log('check man', currentUser)


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            USER PROFILE
          </Typography>
          <Button onClick={() => { clearUserInfo(); localStorage.clear(); history.push('/sign-in')}}  color="primary" variant="outlined" className={classes.link}>
            Log-Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {currentUser?.data?.user?.userName.toUpperCase()}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          <p>
            <strong>Email:</strong> {currentUser?.data?.user?.email}
          </p>
          <p>
            <strong>Id:</strong> {currentUser?.data?.user?._id}
          </p>
          <p>
            <strong>Token:</strong>{currentUser?.token.substring(0, 20)} ...{' '}
          </p>
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">

      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  const { user } = state
  return { currentUser: user?.data?.user }
}
const mapDispatchToProps = dispatch => ({
  clearUserInfo: () => dispatch(ActionCreators.clearUserData())
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
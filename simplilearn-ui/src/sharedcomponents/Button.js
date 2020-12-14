import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
function ButtonComponent(props) {
    const classes = useStyles();
    const { type, variant, color,btnTxt, disabled } = props;

    return (

        <Button
            type={type}
            fullWidth
            variant={variant}
            color={color}
            className={classes.submit}
            disabled={disabled}
        >
           {btnTxt}
        </Button>
    );
}

export default ButtonComponent;

import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';


function TextFieldComponent(props) {
    const {label, name, value, autoComplete, handleChange, validators,errorMessages } = props;

    return (
        <TextValidator
            fullWidth
            label={label}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => handleChange(e)}
            validators={validators}
            errorMessages={errorMessages}
        />

     
    );
}

export default TextFieldComponent;

import React from "react";
import {Button, TextField} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button";
import {TextFieldProps} from "@material-ui/core/TextField";

type Hash = { [x: string]: any };

class PureButton extends React.Component<ButtonProps & Hash> {
    shouldComponentUpdate = (): boolean => false;

    render = () => <Button {...this.props} />;
}

class PureTextField extends React.Component<TextFieldProps> {
    shouldComponentUpdate = (nextProps: Readonly<TextFieldProps>): boolean => this.props.value !== nextProps.value;

    render = () => <TextField {...this.props} />;
}

export {PureButton, PureTextField};

import React from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button";
import {TextFieldProps} from "@material-ui/core/TextField";
import {TypographyProps} from "@material-ui/core/Typography";

type Hash = { [x: string]: any };

class PureTypography extends React.Component<TypographyProps & Hash> {
    shouldComponentUpdate = (nextProps: Readonly<TypographyProps>): boolean => this.props.children !== nextProps.children;
    render = () => <Typography {...this.props}/>;
}

class PureButton extends React.Component<ButtonProps & Hash> {
    shouldComponentUpdate = (nextProps: Readonly<ButtonProps & Hash>): boolean => this.props.disabled !== nextProps.disabled;
    render = () => <Button {...this.props} />;
}

class PureTextField extends React.Component<TextFieldProps> {
    shouldComponentUpdate = (nextProps: Readonly<TextFieldProps>): boolean => this.props.value !== nextProps.value;
    render = () => <TextField {...this.props} />;
}

export {PureButton, PureTextField, PureTypography};

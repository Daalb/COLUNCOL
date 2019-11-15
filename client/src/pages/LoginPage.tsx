import React, {ChangeEvent} from "react";
import {Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {loginAction} from "../config/authReducer";

type ReduxProps = Partial<{
    loggedIn: boolean,
    onLogin: (username: string) => void
}>;

type LoginPageProps = {} & ReduxProps;

type LoginPageState = {
    [x: string]: string
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {username: "", password: ""};
    }

    shouldComponentUpdate = (nextProps: Readonly<LoginPageProps>, nextState: Readonly<LoginPageState>): boolean => {
        return this.props.loggedIn !== nextProps.loggedIn || this.state !== nextState;
    };

    onLoginClick = () => {
        const {onLogin} = this.props;
        const {username, password} = this.state;
        if (onLogin) onLogin(username);
    };

    onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({[e.target.id]: e.target.value});

    render = () => {
        const {username, password} = this.state;
        if (this.props.loggedIn) return <Redirect to={"/"}/>;
        return (
            <Grid container justify={"center"}>
                <Grid item xs={12} sm={7} md={5} lg={4}>
                    <Card className={"login-card"}>
                        <CardContent>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Typography variant={"h5"}>INICIAR SESIÓN</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth variant={"outlined"} id={"username"}
                                                       label={"Usuario"} onChange={this.onTextFieldChange}
                                                       value={username}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth variant={"outlined"} id={"password"}
                                                       label={"Contraseña"} type={"password"}
                                                       onChange={this.onTextFieldChange} value={password}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify={"space-between"}>
                                        <Grid item>
                                            <Button color={"primary"} variant={"contained"} onClick={this.onLoginClick}>
                                                iniciar sesion
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button component={Link} to={"/"}>volver a inicio</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({auth}: any): ReduxProps => ({
    loggedIn: auth.loggedIn
});

const mapDispatchToProps = (dispatch: (p: any) => void): ReduxProps => ({
    onLogin: (username) => dispatch(loginAction(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

import React, {ChangeEvent} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import {loginAction} from "../config/authReducer";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {PureButton, PureTextField} from "../components/pure";

type ReduxProps = Partial<{
    loggedIn: boolean,
    onLogin: (username: string) => void
}>;

@observer
class LoginPage extends React.Component<any, any> {
    @observable private username = "";
    @observable private password = "";

    @action onUsernameChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => this.username = value;
    @action onPasswordChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => this.password = value;

    onLoginClick = () => {
        const {onLogin} = this.props;
        if (onLogin) onLogin(this.username);
    };

    render() {
        if (this.props.loggedIn) return <Redirect to={"/"}/>;
        return (
            <Grid container justify={"center"}>
                <p>{this.username} </p>
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
                                            <PureTextField fullWidth variant={"outlined"} id={"username"}
                                                           label={"Usuario"} onChange={this.onUsernameChange}
                                                           value={this.username}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PureTextField fullWidth variant={"outlined"} id={"password"}
                                                           label={"Contraseña"} type={"password"}
                                                           onChange={this.onPasswordChange} value={this.password}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify={"space-between"}>
                                        <Grid item>
                                            <PureButton color={"primary"} variant={"contained"}
                                                        onClick={this.onLoginClick}>
                                                iniciar sesion
                                            </PureButton>
                                        </Grid>
                                        <Grid item>
                                            <PureButton component={Link} to={"/"}>volver a inicio</PureButton>
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

export default LoginPage;

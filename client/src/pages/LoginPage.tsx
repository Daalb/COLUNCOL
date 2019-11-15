import React from "react";
import {Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

type ReduxProps = Partial<{ loggedIn: boolean }>;

type LoginPageProps = {} & ReduxProps;

class LoginPage extends React.Component<LoginPageProps> {
    render = () => {
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
                                            <TextField fullWidth variant={"outlined"} id={"username-input"}
                                                       label={"Usuario"}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth variant={"outlined"} id={"password-input"}
                                                       label={"Contraseña"} type={"password"}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify={"space-between"}>
                                        <Grid item>
                                            <Button color={"primary"} variant={"contained"}>iniciar sesion</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button>volver a inicio</Button>
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

export default connect(mapStateToProps)(LoginPage);

import React, {ChangeEvent} from "react";
import {Card, CardContent, Grid} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import {action, observable} from "mobx";
import {PureButton, PureTextField, PureTypography} from "../components/pure";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";

@inject("store")
@observer
class LoginPage extends WithStore {
    @observable
    private info: { [x: string]: any } = {
        username: "",
        password: ""
    };

    @action
    onFieldChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => this.info[id] = value;

    onLoginClick = () => this.store.login(this.info.username);

    render() {
        if (this.store.isLogged) return <Redirect to={"/"}/>;
        return (
            <Grid container justify={"center"}>
                <Grid item xs={12} sm={7} md={5} lg={4}>
                    <Card className={"login-card"}>
                        <CardContent>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <PureTypography variant={"h5"}>INICIAR SESIÓN</PureTypography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}/>
                                        <Grid item xs={12}>
                                            <PureTextField fullWidth variant={"outlined"} id={"username"}
                                                           label={"Usuario"} onChange={this.onFieldChange}
                                                           value={this.info.username}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PureTextField fullWidth variant={"outlined"} id={"password"}
                                                           label={"Contraseña"} type={"password"}
                                                           onChange={this.onFieldChange} value={this.info.password}/>
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

export default LoginPage;

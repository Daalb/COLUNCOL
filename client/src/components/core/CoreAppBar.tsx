import React, {Fragment} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

export default class CoreAppBar extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Fragment>
                <AppBar position={"fixed"} className={"bar"}>
                    <Toolbar>
                        <Typography variant="h6">Coluncol</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
            </Fragment>
        );
    };
}

import React, {Fragment} from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import {PureTypography} from "../pure";

export default class CoreAppBar extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Fragment>
                <AppBar position={"fixed"} className={"bar"}>
                    <Toolbar>
                        <PureTypography variant="h6">Coluncol</PureTypography>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
                <Toolbar/>
            </Fragment>
        );
    };
}

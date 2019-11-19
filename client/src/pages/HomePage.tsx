import React, {Fragment} from 'react';
import {PureTypography} from "../components/pure";

export default class HomePage extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Fragment>
                <PureTypography variant={"h3"}>Bienvenido!</PureTypography>
                <PureTypography variant={"h4"}>Herramienta de gestión de escuelas COLUNCOL</PureTypography>
            </Fragment>
        );
    }
}
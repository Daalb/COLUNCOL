import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import {Headline3} from "@material/react-typography";
import forbidden from "../assets/forbidden.svg";

export default class NotFoundPage extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Grid>
                <Row>
                    <Cell columns={12} align={"middle"} className={"text-center"}>
                        <img src={forbidden} className={"forbidden-icon"}/>
                        <Headline3>Página no encontrada...</Headline3>
                    </Cell>
                </Row>
            </Grid>
        );
    }
}
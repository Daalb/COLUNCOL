import React from "react";
import {Fab, PropTypes} from "@material-ui/core";

type Item = {
    color: PropTypes.Color,
    Icon: any,
    to: string
};

type CoreFabNavigatorProps = {
    data: Item[]
};

export default class CoreFabNavigator extends React.Component<CoreFabNavigatorProps> {
    shouldComponentUpdate = (): boolean => false;

    renderItem = (item: Item, index: number) => {
        const {color, Icon, to} = item;
        return <Fab key={index} component={"a"} href={to} color={color}><Icon/></Fab>;
    };

    render = () => {
        const {data} = this.props;
        return <div className={"fabNavigator"}>{data.map(this.renderItem)}</div>
    };
}
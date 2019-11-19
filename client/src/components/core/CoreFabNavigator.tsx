import React from "react";
import {Fab} from "@material-ui/core";

type CoreFabNavigatorProps = {
    data: FastNavItem[]
};

export default class CoreFabNavigator extends React.Component<CoreFabNavigatorProps> {
    shouldComponentUpdate = (): boolean => false;

    renderItem = (item: FastNavItem, index: number) => {
        const {color, label, to} = item;
        return <Fab key={index} variant={"extended"} size={"small"} component={"a"} href={to} color={color}>{label}</Fab>;
    };

    render = () => {
        const {data} = this.props;
        return <div className={"fabNavigator"}>{data.map(this.renderItem)}</div>
    };
};

import React, {Fragment} from 'react';
import Drawer, {DrawerAppContent, DrawerContent} from "@material/react-drawer";
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import Button from "@material/react-button";

interface CoreNavigationState {
    open: boolean
}

export default class CoreNavigation extends React.PureComponent<{}, CoreNavigationState> {
    constructor(props: {}) {
        super(props);
        this.state = {open: false};
    }

    switchDrawer = () => this.setState({open: !this.state.open});

    render = () => {
        return (
            <Fragment>
                <Drawer modal open={this.state.open} onClose={this.switchDrawer}>
                    <DrawerContent>
                        <Button raised>Click me!</Button>
                    </DrawerContent>
                </Drawer>
                <DrawerAppContent>
                    <TopAppBar>
                        <TopAppBarRow>
                            <TopAppBarSection align='start'>
                                <TopAppBarIcon navIcon tabIndex={0}>
                                    <MaterialIcon hasRipple icon='menu' onClick={this.switchDrawer}/>
                                </TopAppBarIcon>
                                <TopAppBarTitle>COLUNCOL</TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection align='end' role='toolbar'>
                                <TopAppBarIcon actionItem tabIndex={0}>
                                    <MaterialIcon
                                        aria-label="print page"
                                        hasRipple
                                        icon='print'
                                        onClick={() => console.log('print')}
                                    />
                                </TopAppBarIcon>
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust>
                        <h1>Content bitch</h1>
                    </TopAppBarFixedAdjust>
                </DrawerAppContent>
            </Fragment>
        );
    }
}
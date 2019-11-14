import React from "react";
import TopAppBar, {TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";

interface CoreTopAppBarProps {
    onHamburgerClick: () => void
}

export default class CoreTopAppBar extends React.Component<CoreTopAppBarProps> {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection align='start'>
                        <TopAppBarIcon navIcon tabIndex={0}>
                            <MaterialIcon hasRipple icon='menu' onClick={this.props.onHamburgerClick}/>
                        </TopAppBarIcon>
                        <TopAppBarTitle>Coluncol</TopAppBarTitle>
                    </TopAppBarSection>
                    {/*<TopAppBarSection align='end' role='toolbar'>*/}
                    {/*    <TopAppBarIcon actionItem tabIndex={0}>*/}
                    {/*        <MaterialIcon*/}
                    {/*            aria-label="print page"*/}
                    {/*            hasRipple*/}
                    {/*            icon='print'*/}
                    {/*            onClick={() => console.log('print')}*/}
                    {/*        />*/}
                    {/*    </TopAppBarIcon>*/}
                    {/*</TopAppBarSection>*/}
                </TopAppBarRow>
            </TopAppBar>
        );
    }
}
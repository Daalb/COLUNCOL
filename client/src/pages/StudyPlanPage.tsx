import React, {ChangeEvent, MouseEvent} from "react";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router";
import {PureButton, PureTextField, PureTypography} from "../components/pure";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {action, computed, observable, reaction} from "mobx";
import {StoreType} from "../store";
import CoreFabNavigator from "../components/core/CoreFabNavigator";

class StudyPlanInternalStore {
    @observable area: StudyArea = {id: 0, name: "", bossId: 0};
    @observable subject: Hash = {id: 0, name: "", hours: 2, areaId: 1};
    private readonly store: StoreType;

    constructor(store: StoreType) {
        reaction(() => this.area.id, this.loadArea);
        reaction(() => this.subject.id, this.loadSubject);
        this.store = store;
    }

    private loadArea = (id: number) => {
        if (id === 0) {
            this.area.name = "";
            this.area.bossId = 0;
            return;
        }
        const area = this.store.findArea(id);
        if (area) {
            this.area.name = area.name;
            this.area.bossId = area.bossId;
            return;
        }
        this.area.name = "";
        this.area.bossId = 0;
    };

    private loadSubject = (id: number) => {
    };

    @computed get inNewAreaMode(): boolean {
        return this.area.id === 0;
    }

    @action trigger = (id: string, value: any) => {
        switch (id) {
            case "areaId":
                this.area.id = Number(value);
                break;
            case "areaName":
                this.area.name = value;
                break;
            case "areaBossId":
                this.area.bossId = Number(value);
                break;
            case "newArea":
                this.area.id = 0;
        }
    };
}

@inject("store")
@observer
export default class StudyPlanPage extends WithStore {
    private readonly internalStore: StudyPlanInternalStore;

    private onChange = ({currentTarget: {id, value}}: ChangeEvent<HTMLInputElement>) => this.internalStore.trigger(id, value);
    private onClick = ({currentTarget: {id}}: MouseEvent) => {
        const vars = id.split("_");
        this.internalStore.trigger(vars[0], vars[1]);
    };

    constructor(props: any) {
        super(props);
        this.internalStore = new StudyPlanInternalStore(this.store);
    }

    onSave = () => {
    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <CoreFabNavigator data={[{color: "primary", to: "#subjectsSection", Icon: Add},{color: "primary", to: "#subjectsSection", Icon: Add}]}/>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Areas de estudio</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"newArea_0"} disabled={this.internalStore.inNewAreaMode} color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <PureTextField fullWidth variant={"outlined"} id={"areaName"} label={"Nombre de area *"}
                                           value={this.internalStore.area.name} onChange={this.onChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <PureTextField fullWidth variant={"outlined"} id={"areaBossId"} label={"Nombre del jefe"}
                                           value={this.internalStore.area.bossId} onChange={this.onChange} select
                                           SelectProps={{native: true}}>
                                <option value={0}>Ninguno</option>
                                {
                                    this.store.teachers.map(area => (
                                        <option key={area.id} value={area.id}>
                                            {area.name}
                                        </option>
                                    ))
                                }
                            </PureTextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <PureButton variant={"contained"} color={"primary"}
                                                onClick={this.onSave}>guardar</PureButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {/*<Toolbar><PureTypography variant={"h6"}>Todas las áreas</PureTypography></Toolbar>*/}
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Jefe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.store.studyAreas.map((area) =>
                                        <TableRow selected={area.id === this.internalStore.area.id}
                                                  id={`areaId_${area.id}`} onClick={this.onClick} hover key={area.id}>
                                            <TableCell>{area.name}</TableCell>
                                            <TableCell>{area.bossId}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={12} id={"subjectsSection"}>
                    <Grid container justify={"space-between"} spacing={3}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Asignaturas</PureTypography>
                        </Grid>
                        {/*<Grid item>*/}
                        {/*    <PureTextField id={"areaId"} label={"Area actual"} variant={"outlined"} select*/}
                        {/*                   value={this.info.area.areaId} onChange={this.onAreaFieldChange}*/}
                        {/*                   margin={"dense"}*/}
                        {/*                   SelectProps={{native: true}}>*/}
                        {/*        <option value={0}>Nuevo...</option>*/}
                        {/*        {*/}
                        {/*            this.store.studyAreas.map(area => (*/}
                        {/*                <option key={area.id} value={area.id}>*/}
                        {/*                    {area.name}*/}
                        {/*                </option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*    </PureTextField>*/}
                        {/*</Grid>*/}
                    </Grid>
                    <br/>
                </Grid>
            </Grid>
        );
    }
}

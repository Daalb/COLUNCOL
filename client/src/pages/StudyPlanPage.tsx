import React, {ChangeEvent, MouseEvent} from "react";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router";
import {PureButton, PureTextField, PureTypography} from "../components/pure";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {action, computed, observable, reaction} from "mobx";
import {StoreType} from "../store";
import CoreFabNavigator from "../components/core/CoreFabNavigator";

class StudyPlanInternalStore {
    @observable area: StudyArea = {id: 0, name: "", bossId: 0};
    @observable subject: Subject = {id: 0, name: "", hours: 2, areaId: 1};
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
        if (id === 0) {
            this.subject.name = "";
            this.subject.hours = 2;
            this.subject.areaId = 1;
            return;
        }
        const subject = this.store.findSubject(id);
        if (subject) {
            this.subject.name = subject.name;
            this.subject.hours = subject.hours;
            this.subject.areaId = subject.areaId;
            return;
        }
        this.subject.name = "";
        this.subject.hours = 2;
        this.subject.areaId = 1;
    };

    @computed get inNewAreaMode(): boolean {
        return this.area.id === 0;
    }

    @computed get inNewSubjectMode(): boolean {
        return this.subject.id === 0;
    }

    @action trigger = (id: string, value: any) => {
        switch (id) {
            case "areaName":
                this.area.name = value;
                break;
            case "subjectName":
                this.subject.name = value;
                break;
            case "subjectHours":
                this.subject.hours = Number(value);
                break;
            case "areaBossId":
                this.area.bossId = Number(value);
                break;
            case "areaId":
                this.area.id = Number(value);
                break;
            case "subjectId":
                this.subject.id = Number(value);
                break;
            case "subjectAreaId":
                this.subject.areaId = Number(value);
                break;
        }
    };
}

@inject("store")
@observer
export default class StudyPlanPage extends WithStore {
    private readonly internalStore: StudyPlanInternalStore;
    private readonly fastNavItems: FastNavItem[] = [
        {color: "secondary", to: "#", label: "Areas"},
        {color: "primary", to: "#subjects", label: "Asignaturas"}
    ];

    private onChange = ({currentTarget: {id, value}}: ChangeEvent<HTMLInputElement>) => this.internalStore.trigger(id, value);
    private onClick = ({currentTarget: {id}}: MouseEvent) => {
        const vars = id.split("_");
        this.internalStore.trigger(vars[0], vars[1]);
    };

    constructor(props: any) {
        super(props);
        this.internalStore = new StudyPlanInternalStore(this.store);
    }

    renderArea = (area: StudyArea) =>
        <TableRow selected={area.id === this.internalStore.area.id} hover key={area.id} onClick={this.onClick}
                  id={`areaId_${area.id}`}>
            <TableCell>{area.name}</TableCell>
            <TableCell>{area.bossId}</TableCell>
        </TableRow>;
    renderSubject = (subject: Subject) =>
        <TableRow selected={subject.id === this.internalStore.subject.id} hover key={subject.id} onClick={this.onClick}
                  id={`subjectId_${subject.id}`}>
            <TableCell>{subject.name}</TableCell>
            <TableCell>{subject.hours}</TableCell>
            <TableCell>{subject.areaId}</TableCell>
        </TableRow>;

    renderAreas = () => this.store.studyAreas.map(this.renderArea);
    renderSubjects = () => this.store.subjects.map(this.renderSubject);

    onAreaSave = () => {
        if (this.internalStore.area.id === 0) {
            this.store.addStudyArea(this.internalStore.area);
            return;
        }
        this.store.updateStudyArea(this.internalStore.area);
    };
    onSubjectSave = () => {
        if (this.internalStore.subject.id === 0) {
            this.store.addSubject(this.internalStore.subject);
            return;
        }
        this.store.updateSubject(this.internalStore.subject);
    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <CoreFabNavigator data={this.fastNavItems}/>
                <Grid item xs={12} id={"areas"}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Areas de estudio</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"areaId_0"} disabled={this.internalStore.inNewAreaMode} color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <PureTextField fullWidth variant={"outlined"} id={"areaName"} label={"Nombre de area *"}
                                           value={this.internalStore.area.name} onChange={this.onChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} sm={5}>
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
                                                onClick={this.onAreaSave}>guardar</PureButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Jefe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderAreas()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={12} id={"subjects"}>
                    <Grid container justify={"space-between"} spacing={3}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Asignaturas</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"subjectId_0"} disabled={this.internalStore.inNewSubjectMode}
                                        color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <PureTextField fullWidth variant={"outlined"} id={"subjectName"}
                                           label={"Nombre de asignatura *"} value={this.internalStore.subject.name}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={5} md={3}>
                            <PureTextField fullWidth variant={"outlined"} id={"subjectHours"}
                                           label={"Horas *"} value={this.internalStore.subject.hours}
                                           onChange={this.onChange} type={"number"} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={7} md={4}>
                            <PureTextField fullWidth variant={"outlined"} id={"subjectAreaId"} label={"Area"}
                                           value={this.internalStore.subject.areaId} onChange={this.onChange} select
                                           SelectProps={{native: true}} helperText={"obligatorio"}>
                                {
                                    this.store.studyAreas.map(area => (
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
                                                onClick={this.onSubjectSave}>guardar</PureButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Horas</TableCell>
                                    <TableCell>Area</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderSubjects()}</TableBody>
                        </Table>
                    </Paper>
                    <br/>
                </Grid>
            </Grid>
        );
    }
}

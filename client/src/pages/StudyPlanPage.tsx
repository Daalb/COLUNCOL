import React, {ChangeEvent} from "react";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router";
import {PureButton, PureTextField, PureTypography} from "../components/pure";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar} from "@material-ui/core";
import {action, computed, observable, reaction} from "mobx";

type StudyPlanHoldedInfo = {
    currentArea: StudyArea
} & Hash;

@inject("store")
@observer
export default class StudyPlanPage extends WithStore {
    @observable private info: Hash = {
        area: {
            areaId: 0,
            areaName: "",
            areaBossId: 0
        },
        subject: {
            subjectId: 0,
            subjectName: "",
            subjectHours: 2,
            subjectAreaId: 1
        }
    };

    constructor(props: any) {
        super(props);
        reaction(() => this.info.area.areaId, this.loadArea);
        reaction(() => this.info.subject.subjectId, this.loadSubject);
    }

    @computed get canCancelArea(): boolean {
        return this.info.area.areaId !== 0;
    }

    @computed get canCancelSubject(): boolean {
        return this.info.subject.subjectId !== 0;
    }

    @action loadArea = (id: string) => {
        const idN = Number(id);
        const area = this.store.findArea(idN);
        if (area) this.info.area = {areaName: area.name, areaBossId: area.bossId, areaId: area.id};
        else this.info.area = {areaName: "", areaBossId: 0, areaId: 0};
    };
    @action loadSubject = (id: string) => {

    };

    @action onAreaFieldChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => this.info.area[id] = value;
    @action onSubjectFieldChange = ({target: {id, value}}: ChangeEvent<HTMLInputElement>) => this.info.subject[id] = value;

    @action onAreaCancel = () => this.info.area = {areaId: 0, areaName: "", areaBossId: 0};
    @action onSubjectCancel = () => this.info.subject = {
        subjectId: 0,
        subjectName: "",
        subjectHours: 2,
        subjectAreaId: 1
    };

    @action onAreaSave = () => {

    };
    @action onSubjectSave = () => {

    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Areas de estudio</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureTextField id={"areaId"} label={"Area actual"} variant={"outlined"} select
                                           value={this.info.area.areaId} onChange={this.onAreaFieldChange}
                                           margin={"dense"}
                                           SelectProps={{native: true}}>
                                <option value={0}>Nuevo...</option>
                                {
                                    this.store.studyAreas.map(area => (
                                        <option key={area.id} value={area.id}>
                                            {area.name}
                                        </option>
                                    ))
                                }
                            </PureTextField>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"areaName"} label={"Nombre de area *"}
                                           value={this.info.area.areaName} onChange={this.onAreaFieldChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"areaBossId"} label={"Nombre del jefe"}
                                           value={this.info.area.areaBossId} onChange={this.onAreaFieldChange} select
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
                            <Grid container spacing={1} justify={"space-between"}>
                                <Grid item>
                                    <PureButton variant={"contained"} color={"primary"}
                                                onClick={this.onAreaSave}>guardar</PureButton>
                                </Grid>
                                <Grid item>
                                    <PureButton disabled={!this.canCancelArea} variant={"contained"}
                                                color={"secondary"} onClick={this.onAreaCancel}>cancelar</PureButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Toolbar><PureTypography variant={"h6"}>Todas las áreas</PureTypography></Toolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Jefe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.store.studyAreas.map((area) =>
                                        <TableRow key={area.id}>
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
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container justify={"space-between"}>
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
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
            </Grid>
        );
    }
}

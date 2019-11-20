import React, {ChangeEvent, MouseEvent} from "react";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";
import {action, computed, observable, reaction} from "mobx";
import {Redirect} from "react-router";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {School} from "@material-ui/icons";
import {PureButton, PureTextField, PureTypography} from "../components/pure";
import {StoreType} from "../store";

class SchoolsInternalStore {
    @observable school: School = {id: 0, name: "", abbr: "", email: "", webPage: "", regId: 0};
    private readonly store: StoreType;

    constructor(store: StoreType) {
        this.store = store;
        reaction(() => this.school.id, this.loadSchool);
    }

    private loadSchool = (id: number) => {
        if (id === 0) {
            this.school.name = "";
            this.school.abbr = "";
            this.school.webPage = "";
            this.school.email = "";
            this.school.regId = 0;
            return;
        }
        const school = this.store.findSchool(id);
        if (school) {
            this.school.name = school.name;
            this.school.abbr = school.abbr;
            this.school.webPage = school.webPage;
            this.school.email = school.email;
            this.school.regId = school.regId;
            return;
        }
        this.school.name = "";
        this.school.abbr = "";
        this.school.webPage = "";
        this.school.email = "";
        this.school.regId = 0;
    };

    @computed get inNewSchoolMode(): boolean {
        return this.school.id === 0;
    }

    @computed get register(): SchoolRegister {
        return this.store.schoolRegisterSearchHash[this.school.regId.toString()];
    }

    @action trigger = (id: string, value: any) => {
        switch (id) {
            case "schoolName":
                this.school.name = value;
                break;
            case "schoolAbbr":
                this.school.abbr = value;
                break;
            case "schoolEmail":
                this.school.email = value;
                break;
            case "schoolWebPage":
                this.school.webPage = value;
                break;
            case "schoolId":
                this.school.id = Number(value);
                break;
        }
    };
}

@inject("store")
@observer
export default class SchoolsPage extends WithStore {
    private readonly internalStore: SchoolsInternalStore;

    private onChange = ({currentTarget: {id, value}}: ChangeEvent<HTMLInputElement>) => this.internalStore.trigger(id, value);
    private onClick = ({currentTarget: {id}}: MouseEvent) => {
        const vars = id.split("_");
        this.internalStore.trigger(vars[0], vars[1]);
    };

    constructor(props: any) {
        super(props);
        this.internalStore = new SchoolsInternalStore(this.store);
    }

    renderSchool = (school: School) =>
        <TableRow selected={school.id === this.internalStore.school.id} hover key={school.id} onClick={this.onClick}
                  id={`schoolId_${school.id}`}>
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.abbr}</TableCell>
            <TableCell>{school.email}</TableCell>
            <TableCell>{school.webPage}</TableCell>
        </TableRow>;

    renderSchools = () => this.store.schools.map(this.renderSchool);

    onSchoolSave = () => {
        if (this.internalStore.school.id === 0) {
            this.store.addSchool(this.internalStore.school);
            return;
        }
        this.store.updateSchool(this.internalStore.school);
    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Escuelas asociadas</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"schoolId_0"} disabled={this.internalStore.inNewSchoolMode}
                                        color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <PureTextField fullWidth variant={"outlined"} id={"schoolName"} label={"Nombre *"}
                                           value={this.internalStore.school.name} onChange={this.onChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <PureTextField fullWidth variant={"outlined"} id={"schoolAbbr"} label={"Siglas *"}
                                           value={this.internalStore.school.abbr} onChange={this.onChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={8} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"schoolEmail"}
                                           label={"Correo electronico *"}
                                           value={this.internalStore.school.email} onChange={this.onChange}
                                           helperText={"obligatorio"} type={"email"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"schoolWebPage"} label={"Pagina web"}
                                           value={this.internalStore.school.webPage} onChange={this.onChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify={"space-between"}>
                                <Grid item>
                                    <PureButton variant={"contained"} color={"primary"}
                                                onClick={this.onSchoolSave}>guardar</PureButton>
                                </Grid>
                                <Grid item>
                                    <PureTypography>{this.internalStore.register ? this.internalStore.register.dateF : ""}</PureTypography>
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
                                    <TableCell>Siglas</TableCell>
                                    <TableCell>C. electronico</TableCell>
                                    <TableCell>P. web</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderSchools()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
            </Grid>
        );
    }
}
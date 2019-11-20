import React, {ChangeEvent, MouseEvent} from "react";
import {WithStore} from "../config/store";
import {action, computed, observable, reaction} from "mobx";
import {StoreType} from "../store";
import {inject, observer} from "mobx-react";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Redirect} from "react-router";
import {PureButton, PureTextField, PureTypography} from "../components/pure";

class HumaneResourcesInternalStore {
    @observable teacher: Teacher & Person = {
        id: 0,
        name2: "",
        name1: "",
        lastName2: "",
        lastName1: "",
        gender: "M",
        personId: 0,
        stLevel: "",
        spec: "",
        role: ""
    };
    @observable student: Student & Person = {
        id: 0,
        name1: "",
        name2: "",
        lastName1: "",
        lastName2: "",
        gender: "F",
        bornDate: Date.now().toString(),
        courseId: 0,
        mReportId: 0,
        personId: 0
    };
    private readonly store: StoreType;

    constructor(store: StoreType) {
        this.store = store;
        reaction(() => this.teacher.id, this.loadTeacher);
        reaction(() => this.student.id, this.loadStudent);
    }

    private loadTeacher = (id: number) => {
        // if (id === 0) {
        //     this.salon.capacity = 0;
        //     return;
        // }
        // const salon = this.store.findSalon(id);
        // if (salon) {
        //     this.salon.capacity = salon.capacity;
        //     return;
        // }
        // this.salon.capacity = 0;
    };

    private loadStudent = (id: number) => {
    };

    @computed get inNewTeacherMode(): boolean {
        return this.teacher.id === 0;
    }

    @computed get inNewStudentMode(): boolean {
        return this.student.id === 0;
    }

    @action trigger = (id: string, value: any) => {
        // switch (id) {
        //     case "salonCapacity":
        //         this.salon.capacity = Number(value);
        //         break;
        //     case "salonId":
        //         this.salon.id = Number(value);
        //         break;
        // }
    };
}

@inject("store")
@observer
export default class HumaneResourcesPage extends WithStore {
    private readonly internalStore: HumaneResourcesInternalStore;

    private onChange = ({currentTarget: {id, value}}: ChangeEvent<HTMLInputElement>) => this.internalStore.trigger(id, value);
    private onClick = ({currentTarget: {id}}: MouseEvent) => {
        const vars = id.split("_");
        this.internalStore.trigger(vars[0], vars[1]);
    };

    constructor(props: any) {
        super(props);
        this.internalStore = new HumaneResourcesInternalStore(this.store);
    }

    renderTeacher = (teacher: Teacher) => {
        const person = this.store.personSearchHash[teacher.personId.toString()];
        const name = `${person.name1} ${person.name2} ${person.lastName1} ${person.lastName2}`;
        return <TableRow selected={teacher.personId === this.internalStore.teacher.personId} hover
                         key={teacher.personId}
                         onClick={this.onClick} id={`teacherId_${teacher.personId}`}>
            <TableCell>{name}</TableCell>
            <TableCell>{teacher.stLevel}</TableCell>
            <TableCell>{teacher.spec}</TableCell>
            <TableCell>{teacher.role}</TableCell>
        </TableRow>;
    };

    renderStudent = (student: Student) => {
        const person = this.store.personSearchHash[student.personId.toString()];
        const name = `${person.name1} ${person.name2} ${person.lastName1} ${person.lastName2}`;
        return <TableRow selected={student.personId === this.internalStore.student.personId} hover
                         key={student.personId}
                         onClick={this.onClick}
                         id={`studentId_${student.personId}`}>
            <TableCell>{name}</TableCell>
            <TableCell>{student.bornDate}</TableCell>
        </TableRow>;
    };

    renderTeachers = () => this.store.teachers.map(this.renderTeacher);

    renderStudents = () => this.store.students.map(this.renderStudent);

    onTeacherSave = () => {
        // if (this.internalStore.salon.id === 0) {
        //     this.store.addSalon(this.internalStore.salon);
        //     return;
        // }
        // this.store.updateSalon(this.internalStore.salon);
    };

    onStudentSave = () => {
        // if (this.internalStore.salon.id === 0) {
        //     this.store.addSalon(this.internalStore.salon);
        //     return;
        // }
        // this.store.updateSalon(this.internalStore.salon);
    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Profesores</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"teacherId_0"} disabled={this.internalStore.inNewTeacherMode}
                                        color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherName1"}
                                           label={"Primer nombre *"} value={this.internalStore.teacher.name1}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherName2"}
                                           label={"Segundo nombre"} value={this.internalStore.teacher.name2}
                                           onChange={this.onChange}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherLastName1"}
                                           label={"Primer apellido *"} value={this.internalStore.teacher.lastName1}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherLastName2"}
                                           label={"Segundo apellido *"} value={this.internalStore.teacher.lastName2}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherGender"} select
                                           label={"Genero *"} value={this.internalStore.teacher.gender}
                                           onChange={this.onChange} helperText={"obligatorio"}>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </PureTextField>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherSpec"}
                                           label={"Especialidad *"} value={this.internalStore.teacher.spec}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherStLevel"}
                                           label={"Nivel academico *"} value={this.internalStore.teacher.stLevel}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherRole"}
                                           label={"Rol *"} value={this.internalStore.teacher.role}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <PureButton variant={"contained"} color={"primary"}
                                        onClick={this.onTeacherSave}>guardar</PureButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Capacidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderTeachers()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
            </Grid>
        );
    }
}

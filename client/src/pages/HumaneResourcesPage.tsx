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
        gender: "O",
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
        gender: "O",
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
        if (id === 0) {
            this.teacher.id = 0;
            this.teacher.name2 = "";
            this.teacher.name1 = "";
            this.teacher.lastName2 = "";
            this.teacher.lastName1 = "";
            this.teacher.gender = "O";
            this.teacher.personId = 0;
            this.teacher.stLevel = "";
            this.teacher.spec = "";
            this.teacher.role = "";
            return;
        }
        const teacher = this.store.findTeacher(id);
        console.log(teacher, "load", id)
        if (teacher) {
            const person = this.store.findPerson(id);
            this.teacher.id = teacher.personId;
            this.teacher.name2 = person.name2;
            this.teacher.name1 = person.name1;
            this.teacher.lastName2 = person.lastName2;
            this.teacher.lastName1 = person.lastName1;
            this.teacher.gender = person.gender;
            this.teacher.personId = teacher.personId;
            this.teacher.stLevel = teacher.stLevel;
            this.teacher.spec = teacher.spec;
            this.teacher.role = teacher.role;
            return;
        }
        this.teacher.id = 0;
        this.teacher.name2 = "";
        this.teacher.name1 = "";
        this.teacher.lastName2 = "";
        this.teacher.lastName1 = "";
        this.teacher.gender = "O";
        this.teacher.personId = 0;
        this.teacher.stLevel = "";
        this.teacher.spec = "";
        this.teacher.role = "";
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
        switch (id) {
            case "teacherName1":
                this.teacher.name1 = value;
                break;
            case "teacherName2":
                this.teacher.name2 = value;
                break;
            case "teacherLastName1":
                this.teacher.lastName1 = value;
                break;
            case "teacherLastName2":
                this.teacher.lastName2 = value;
                break;
            case "teacherGender":
                this.teacher.gender = value;
                break;
            case "teacherStLevel":
                this.teacher.lastName2 = value;
                break;
            case "teacherSpec":
                this.teacher.spec = value;
                break;
            case "teacherRole":
                this.teacher.role = value;
                break;
            case "teacherId":
                this.teacher.id = Number(value);
                this.teacher.personId = Number(value);
                break;
        }
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
        const person = this.store.personSearchHash[teacher.personId.toString()] || {} as Hash;
        const name = `${person.name1} ${person.name2 ? person.name2 + " " : ""}${person.lastName1} ${person.lastName2}`;
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
                                           SelectProps={{native: true}} label={"Genero *"}
                                           value={this.internalStore.teacher.gender} onChange={this.onChange}
                                           helperText={"obligatorio"}>
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
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Nivel acad.</TableCell>
                                    <TableCell>Especialidad</TableCell>
                                    <TableCell>Rol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderTeachers()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>


                <Grid item xs={12}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Estudiantes</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"studentId_0"} disabled={this.internalStore.inNewStudentMode}
                                        color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"studentName1"}
                                           label={"Primer nombre *"} value={this.internalStore.teacher.name1}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"studentName2"}
                                           label={"Segundo nombre"} value={this.internalStore.teacher.name2}
                                           onChange={this.onChange}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"studentLastName1"}
                                           label={"Primer apellido *"} value={this.internalStore.teacher.lastName1}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PureTextField fullWidth variant={"outlined"} id={"studentLastName2"}
                                           label={"Segundo apellido *"} value={this.internalStore.teacher.lastName2}
                                           onChange={this.onChange} helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PureTextField fullWidth variant={"outlined"} id={"teacherGender"} select
                                           SelectProps={{native: true}} label={"Genero *"}
                                           value={this.internalStore.teacher.gender} onChange={this.onChange}
                                           helperText={"obligatorio"}>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </PureTextField>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <PureTextField fullWidth variant={"outlined"} id={"studentBornDate"}
                                           label={"Fecha de nacimiento (YYYY-mm-dd) *"}
                                           value={this.internalStore.teacher.spec}
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
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Fecha de nacimiento</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderStudents()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
            </Grid>
        );
    }
}

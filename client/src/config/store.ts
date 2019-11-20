import {action, computed, observable} from "mobx";
import {Component} from "react";
import {StoreProps, StoreType} from "../store";

class Store {
    @observable auth: AuthInfo = {
        logged: true,
        username: "ADMIN",
        admin: true,
        schoolId: 0
    };
    @observable schools: School[] = observable([]);
    @observable teachers: Teacher[] = observable([]);
    @observable studyAreas: StudyArea[] = observable([]);
    @observable subjects: Subject[] = observable([]);
    @observable schoolRegisters: SchoolRegister[] = observable([]);
    @observable salones: Salon[] = observable([]);
    @observable persons: Person[] = observable([]);
    @observable students: Student[] = observable([]);

    @computed get isLogged(): boolean {
        return this.auth.logged;
    }

    @computed get isUnlogged(): boolean {
        return !this.auth.logged;
    }

    @computed get misSalones(): Salon[] {
        return this.salones.filter((salon) => salon.schoolId === this.auth.schoolId);
    }

    @computed get teachersSearchHash(): Hash<Teacher> {
        const result: Hash<Teacher> = {"0": {personId: 0, role: "", spec: "", stLevel: ""}};
        this.teachers.forEach((teacher) => result[teacher.personId.toString()] = teacher);
        return result;
    }

    @computed get personSearchHash(): Hash<Person> {
        const result: Hash<Person> = {
            "0": {
                gender: "",
                id: 0,
                lastName1: "",
                lastName2: "",
                name1: "Ninguno",
                name2: ""
            }
        };
        this.persons.forEach((person) => result[person.id.toString()] = person);
        return result;
    }

    @computed get studyAreasSearchHash(): Hash<StudyArea> {
        const result: Hash<StudyArea> = {"0": {id: 0, name: "Ninguno"}};
        this.studyAreas.forEach((area) => result[area.id.toString()] = area);
        return result;
    }

    @computed get subjectsSearchHash(): Hash<Subject> {
        const result: Hash<Subject> = {"0": {id: 0, name: "No existe", areaId: 1, hours: 0}};
        this.subjects.forEach((subject) => result[subject.id.toString()] = subject);
        return result;
    }

    @computed get schoolRegisterSearchHash(): Hash<SchoolRegister> {
        const result: Hash<SchoolRegister> = {};
        this.schoolRegisters.forEach((reg) => result[reg.id.toString()] = reg);
        return result;
    }

    @action login = (username: string) => {
        if (username.toLowerCase() === 'admin') this.auth = {username: 'ADMIN', logged: true, admin: true, schoolId: 0};
        else {
            const school = this.findSchool(Number(username));
            this.auth = {username: school.name, logged: true, admin: false, schoolId: school.id};
        }
    };

    @action logout = () => this.auth = {username: "", logged: false, admin: false, schoolId: 0};

    @action updateStudyArea = (area: StudyArea) => {
        const areaRef = this.findArea(area.id);
        if (!areaRef) return;
        areaRef.name = area.name;
    };

    @action updateSubject = (subject: Subject) => {
        const subjectRef = this.findSubject(subject.id);
        if (!subjectRef) return;
        subjectRef.name = subject.name;
        subjectRef.hours = subject.hours;
        subjectRef.areaId = subject.areaId;
    };

    @action updateSchool = (school: School) => {
        const schoolRef = this.findSchool(school.id);
        if (!schoolRef) return;
        schoolRef.name = school.name;
        schoolRef.abbr = school.abbr;
        schoolRef.webPage = school.webPage;
        schoolRef.email = school.email;
    };

    @action updateSalon = (salon: Salon) => {
        const salonRef = this.findSalon(salon.id);
        if (!salonRef) return;
        salonRef.capacity = salon.capacity;
    };

    @action addStudyArea = (area: StudyArea) => {
        area.id = Math.round(Math.random() * 10000);
        this.studyAreas.push({id: area.id, name: area.name});
    };

    @action addSubject = (subject: Subject) => {
        subject.id = Math.round(Math.random() * 10000);
        this.subjects.push({id: subject.id, name: subject.name, hours: subject.hours, areaId: subject.areaId});
    };

    @action addSchool = (school: School) => {
        school.id = Math.round(Math.random() * 10000);
        this.schools.push({
            id: school.id,
            name: school.name,
            abbr: school.abbr,
            webPage: school.abbr,
            email: school.email,
            regId: 0
        });
    };

    @action addSalon = (salon: Salon) => {
        salon.id = Math.round(Math.random() * 10000);
        this.salones.push({id: salon.id, capacity: salon.capacity, schoolId: this.auth.schoolId});
    };

    findArea = (id: number): StudyArea => this.studyAreas.find((area) => area.id === id);
    findSubject = (id: number): Subject => this.subjects.find((subject) => subject.id === id);
    findSchool = (id: number): School => this.schools.find((school) => school.id === id);
    findSalon = (id: number): Salon => this.salones.find((salon) => salon.id === id);
    findTeacher = (id: number): Teacher => this.teachers.find((teacher) => teacher.personId === id);
    findPerson = (id: number): Person => this.persons.find((teacher) => teacher.id === id);
}

class WithStore<P = {}, S = {}> extends Component<P & StoreProps, S> {
    get store(): StoreType {
        return this.props.store!!;
    }
}

const store = new Store();
export {store, WithStore};

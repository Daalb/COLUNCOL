import {action, computed, observable} from "mobx";
import {Component} from "react";
import {StoreProps, StoreType} from "../store";

class Store {
    @observable auth: AuthInfo = {
        logged: true,
        username: "IE Jesus Maestro",
        admin: false
    };
    @observable schools: School[] = observable([
        {id: 1, name: "IE Jesus Maestro", abbr: "IEJM", webPage: "", email: "injema@gmail.com"},
        {id: 2, name: "Colegio Jose Barros Manotas", abbr: "JOBAMA", webPage: "", email: "jobama@gmail.com"},
    ]);
    @observable teachers: Teacher[] = observable([
        {id: 1, name: "Jose Padilla"},
        {id: 2, name: "Luis Potte"},
        {id: 3, name: "Diego Albor"},
    ]);
    @observable studyAreas: StudyArea[] = observable([]);
    @observable subjects: Subject[] = observable([]);

    @computed get isLogged(): boolean {
        return this.auth.logged;
    }

    @computed get isUnlogged(): boolean {
        return !this.auth.logged;
    }

    @computed get teachersSearchHash(): Hash<Teacher> {
        const result: Hash<Teacher> = {"0": {id: 0, name: "Ninguno"}};
        this.teachers.forEach((teacher) => result[teacher.id.toString()] = teacher);
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

    @action login = (username: string) => {
        this.auth = {username, logged: true, admin: true};
    };

    @action logout = () => this.auth = {username: "", logged: false, admin: false};

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
            email: school.email
        });
    };

    findArea = (id: number): StudyArea => this.studyAreas.find((area) => area.id === id);
    findSubject = (id: number): Subject => this.subjects.find((subject) => subject.id === id);
    findSchool = (id: number): School => this.schools.find((school) => school.id === id);
}

class WithStore<P = {}, S = {}> extends Component<P & StoreProps, S> {
    get store(): StoreType {
        return this.props.store!!;
    }
}

const store = new Store();
export {store, WithStore};

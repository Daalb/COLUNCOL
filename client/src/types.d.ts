type Hash<T = any> = { [x: string]: T };
type AuthInfo = {
    logged: boolean,
    username: string,
    admin: boolean,
    schoolId: number
};
type Salon = {
    id: number,
    capacity: number,
    schoolId: number
};
type Person = {
    id: number,
    name1: string,
    name2: string,
    lastName1: string,
    lastName2: string,
    gender: string
};
type School = {
    id: number,
    name: string,
    abbr: string,
    webPage: string,
    email: string,
    regId: number
};
type Teacher = {
    personId: number,
    stLevel: string,
    spec: string,
    role: string
};
type StudyArea = {
    id: number,
    name: string
};
type Subject = {
    id: number,
    name: string,
    hours: number,
    areaId: number
}
type SchoolRegister = {
    id: number,
    state: string,
    dateA: Date,
    dateF: Date,
    renov: string
};
type FastNavItem = {
    color: any,
    label: string,
    to: string
};
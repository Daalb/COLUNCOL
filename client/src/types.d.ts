type Hash<T = any> = { [x: string]: T };
type AuthInfo = {
    logged: boolean,
    username: string,
    admin: boolean
};
type School = {
    id: number,
    name: string,
    abbr: string,
    webPage: string,
    email: string
};
type Teacher = {
    id: number,
    name: string,
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
type FastNavItem = {
    color: any,
    label: string,
    to: string
};
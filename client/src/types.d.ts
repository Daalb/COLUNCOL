type Hash = { [x: string]: any };
type AuthInfo = {
    logged: boolean,
    username: string,
    admin: boolean
};
type Teacher = {
    id: number,
    name: string,
};
type StudyArea = {
    id: number,
    name: string,
    bossId: number
};
type Subject = {
    id: number,
    name: string,
    hours: number,
    areaId: number
}
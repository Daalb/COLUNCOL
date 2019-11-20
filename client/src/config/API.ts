import axios from "axios";
import cookies from "js-cookie";
import {store} from "./store";
import {observable} from "mobx";

type Hash = { [x: string]: any }
type APIResponse =
    { okay: true, payload: Hash } |
    { okay: false, errors: Hash }

const BASE_URL = window.location.href.includes("localhost") ? "http://192.168.99.101:8101/api" : "/api";
const BASE_COOKIE_CONFIG = {expires: 3};

const url = (...dirs: string[]): string => (`${BASE_URL}/${dirs.join("/")}`);
const withQueryParams = (url: string, query_params: Hash): string => (`${url}?${Object.keys(query_params).map((k) => (`${k}=${query_params[k]}`)).join("&")}`);

const APILogout = () => cookies.remove("token", BASE_COOKIE_CONFIG);

const loadAreas = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('getareas.php'));
        const data = response.data.map((i) => ({id: i.id_area, name: i.nombre}));
        store.studyAreas = observable(data);
    } catch (e) {
        store.studyAreas = observable([]);
    }
};

const loadSubjects = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('get_asignaturas.php'));
        const data = response.data.map((i) => ({
            id: i.id_asignatura,
            name: i.nombre,
            hours: i.Horas,
            areaId: i.id_area
        }));
        store.subjects = observable(data);
    } catch (e) {
        store.subjects = observable([]);
    }
};

export {APILogout, loadAreas, loadSubjects};
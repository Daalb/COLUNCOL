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
        const data = response.data.map((i) => ({id: Number(i.id_area), name: i.nombre}));
        store.studyAreas = observable(data);
    } catch (e) {
        store.studyAreas = observable([]);
    }
};

const loadSubjects = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('get_asignaturas.php'));
        const data = response.data.map((i) => ({
            id: Number(i.id_asignatura),
            name: i.nombre,
            hours: Number(i.Horas),
            areaId: Number(i.id_area)
        }));
        store.subjects = observable(data);
    } catch (e) {
        store.subjects = observable([]);
    }
};

const loadSchools = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('get_colegios.php'));
        const data = response.data.map((i) => ({
            id: Number(i.id_colegio),
            name: i.nombre,
            abbr: i.siglas,
            webPage: i.pag_web,
            email: i.correo,
            regId: Number(i.id_registro)
        }));
        store.schools = observable(data);
    } catch (e) {
        store.schools = observable([]);
    }
};

const loadSchoolRegisters = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('get_registros_colegio.php'));
        const data = response.data.map((i) => ({
            id: Number(i.id_registro),
            state: i.estado,
            dateA: i.fecha_asig,
            dateF: i.fecha_fin,
            renov: i.renov,
        }));
        store.schoolRegisters = observable(data);
    } catch (e) {
        store.schoolRegisters = observable([]);
    }
};

const loadSalones = async (): Promise<void> => {
    try {
        const response = await axios.get<any[]>(url('get_salones.php'));
        const data = response.data.map((i) => ({
            id: Number(i.id_salon),
            capacity: Number(i.capacidad),
            schoolId: Number(i.id_colegio)
        }));
        store.salones = observable(data);
    } catch (e) {
        store.salones = observable([]);
    }
};

export {APILogout, loadAreas, loadSubjects, loadSchools, loadSchoolRegisters, loadSalones};

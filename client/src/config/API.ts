import axios from "axios";
import cookies from "js-cookie";

type Hash = { [x: string]: any }
type APIResponse =
    { okay: true, payload: Hash } |
    { okay: false, errors: Hash }

const BASE_URL = window.location.href.includes("localhost") ? "http://192.168.99.101:8101/api" : "/api";
const BASE_COOKIE_CONFIG = {expires: 3};

const url = (...dirs: string[]): string => (`${BASE_URL}/${dirs.join("/")}`);
const withQueryParams = (url: string, query_params: Hash): string => (`${url}?${Object.keys(query_params).map((k) => (`${k}=${query_params[k]}`)).join("&")}`);

axios.get(BASE_URL + "/connectionTest.php").then(
    (v) => console.log(v.data),
);

const APILogout = () => cookies.remove("token", BASE_COOKIE_CONFIG);

const startApp = async (): Promise<APIResponse> => {
    const token = cookies.get("token");
    const username = cookies.get("username");
    if (token && username) {
        try {
            const response = await axios.get(withQueryParams(url("users", "valid-token"), {token: token}));
            cookies.set("token", token, BASE_COOKIE_CONFIG);
            cookies.set("username", response.data.payload.username, BASE_COOKIE_CONFIG);
            return {okay: true, payload: {token: token, username: response.data.payload.username}}
        } catch (e) {
            cookies.remove("token", BASE_COOKIE_CONFIG);
            cookies.remove("username", BASE_COOKIE_CONFIG);
            if (e.response) return {okay: false, errors: e.response.data};
            else return {okay: false, errors: {credentials: "Connection error."}};
        }
    }
    return {okay: false, errors: {}};
};

export {APILogout};
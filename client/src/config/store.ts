import {action, observable} from "mobx";

type AuthInfo = {
    logged: boolean,
    username: string,
    admin: boolean
}

class Store {
    @observable
    auth: AuthInfo = {
        logged: false,
        username: "",
        admin: false
    };

    @action
    login = (username: string) => this.auth = {username, logged: true, admin: true};

    @action
    logout = () => this.auth = {username: "", logged: false, admin: false};
}

const store = new Store();
export default store;

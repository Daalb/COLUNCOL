import {action, observable} from "mobx";
import {Component} from "react";

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

type StoreType = typeof store;

class WithStore<P = {}, S = {}> extends Component<P, S> {
    store = (s: Readonly<P> = this.props): StoreType => (s as any).store as StoreType;
}

const store = new Store();
export {store, WithStore};

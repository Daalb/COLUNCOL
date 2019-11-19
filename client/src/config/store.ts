import {action, computed, observable} from "mobx";
import {Component} from "react";
import {StoreProps, StoreType} from "../store";

class Store {
    @observable auth: AuthInfo = {
        logged: true,
        username: "IE Jesus Maestro",
        admin: false
    };
    @observable teachers: Teacher[] = [{id: 1, name: "Jose Padilla"}];
    @observable studyAreas: StudyArea[] = [
        {id: 1, name: "Humanidades", bossId: 1},
        {id: 2, name: "Ciencias", bossId: 1},
        {id: 3, name: "Etica y valores", bossId: 1},
    ];
    @observable subjects: Subject[] = [{id: 1, name: "Ciencias Sociales", hours: 4, areaId: 1}];

    @computed get isLogged(): boolean {
        return this.auth.logged;
    }

    @computed get isUnlogged(): boolean {
        return !this.auth.logged;
    }

    @action login = (username: string) => {
        this.auth = {username, logged: true, admin: true};
    };

    @action logout = () => this.auth = {username: "", logged: false, admin: false};

    findArea = (id: number): StudyArea => this.studyAreas.find((area) => area.id === id);
}

class WithStore<P = {}, S = {}> extends Component<P & StoreProps, S> {
    get store(): StoreType {
        return this.props.store!!;
    }
}

const store = new Store();
export {store, WithStore};

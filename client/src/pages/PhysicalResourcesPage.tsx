import React, {ChangeEvent, MouseEvent} from "react";
import {WithStore} from "../config/store";
import {inject, observer} from "mobx-react";
import {action, computed, observable, reaction} from "mobx";
import {StoreType} from "../store";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Redirect} from "react-router";
import {PureButton, PureTextField, PureTypography} from "../components/pure";

class PhysicalResourcesInternalStore {
    @observable salon: Salon = {id: 0, capacity: 0, schoolId: 0};
    private readonly store: StoreType;

    constructor(store: StoreType) {
        this.store = store;
        reaction(() => this.salon.id, this.loadSalon);
    }

    private loadSalon = (id: number) => {
        if (id === 0) {
            this.salon.capacity = 0;
            return;
        }
        const salon = this.store.findSalon(id);
        if (salon) {
            this.salon.capacity = salon.capacity;
            return;
        }
        this.salon.capacity = 0;
    };

    @computed get inNewSalonMode(): boolean {
        return this.salon.id === 0;
    }

    @action trigger = (id: string, value: any) => {
        switch (id) {
            case "salonCapacity":
                this.salon.capacity = Number(value);
                break;
            case "salonId":
                this.salon.id = Number(value);
                break;
        }
    };
}

@inject("store")
@observer
export default class PhysicalResourcesPage extends WithStore {
    private readonly internalStore: PhysicalResourcesInternalStore;

    private onChange = ({currentTarget: {id, value}}: ChangeEvent<HTMLInputElement>) => this.internalStore.trigger(id, value);
    private onClick = ({currentTarget: {id}}: MouseEvent) => {
        const vars = id.split("_");
        this.internalStore.trigger(vars[0], vars[1]);
    };

    constructor(props: any) {
        super(props);
        this.internalStore = new PhysicalResourcesInternalStore(this.store);
    }

    renderSalon = (salon: Salon) =>
        <TableRow selected={salon.id === this.internalStore.salon.id} hover key={salon.id} onClick={this.onClick}
                  id={`salonId_${salon.id}`}>
            <TableCell>{salon.id}</TableCell>
            <TableCell>{salon.capacity}</TableCell>
        </TableRow>;

    renderSalones = () => this.store.misSalones.map(this.renderSalon);

    onSalonSave = () => {
        if (this.internalStore.salon.id === 0) {
            this.store.addSalon(this.internalStore.salon);
            return;
        }
        this.store.updateSalon(this.internalStore.salon);
    };

    render() {
        if (!this.store.isLogged) return <Redirect to={"/login"}/>;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <PureTypography variant={"h4"}>Salones</PureTypography>
                        </Grid>
                        <Grid item>
                            <PureButton id={"salonId_0"} disabled={this.internalStore.inNewSalonMode} color={"primary"}
                                        onClick={this.onClick}>nuevo</PureButton>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <PureTextField fullWidth variant={"outlined"} id={"salonCapacity"}
                                           label={"Capacida de salon *"}
                                           value={this.internalStore.salon.capacity} onChange={this.onChange}
                                           helperText={"obligatorio"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <PureButton variant={"contained"} color={"primary"}
                                        onClick={this.onSalonSave}>guardar</PureButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Capacidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{this.renderSalones()}</TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
            </Grid>
        );
    }
}
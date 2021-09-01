import Event from "./event";
import { RouterWrapper } from "./router";


export default class Module extends RouterWrapper {
    public id: string;
    public active = true;

    constructor(id: string) {
        super();
        this.id = id;
    }

    public deactivate() {
        this.active = false;
    }

    public activate() {
        this.active = true;
    }
}
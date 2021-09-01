import Socket from "./socket";
import Platform from "./platform";


type EventConstructor = {
    type: string;
    platform: Platform;
    socket: Socket;
    model: any;
    parameters?: any;
}

export type EventAdapterOutput = {
    type: string;
    model: any;
}

export default class Event {
    public type: string;
    public platform: Platform;
    public socket: Socket;
    public model: any;
    public parameters: any;
    public closed = false;

    constructor(parameters: EventConstructor) {
        this.type = parameters.type;
        this.platform = parameters.platform;
        this.socket = parameters.socket;
        this.model = parameters.model;
        this.parameters = parameters.parameters || {};
    }

    public close() {
        this.closed = true;
    }
}
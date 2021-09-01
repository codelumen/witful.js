import App from "./app";
import Socket, { SocketConstructor } from "./socket";
import Event, { EventAdapterOutput } from "./event";


export type PlatformConstructor = {
    id: string,
    app?: App | App[]
}

export default abstract class Platform {
    public id: string;
    public apps = [] as App[];
    public sockets = [] as Socket[];

    constructor(parameters: PlatformConstructor) {
        this.id = parameters.id;
        if (parameters.app) this.connect(parameters.app);
    }

    public connect(app: App | App[]) {
        if (app instanceof Array) {
            this.apps.concat(app);
            for (let a of app) a.connect(this, true);
        } else {
            this.apps.concat([ app ]);
            app.connect(this, true);
        }
    }

    public openSocket(parameters: SocketConstructor) {
        let socket = new Socket(this, parameters);
        this.sockets.push(socket);
    }

    public redirectEvent(socket: Socket, event: any) {
        let processed = this.eventAdapter(event);
        for (let app of this.apps) {
            app.catchEvent(new Event({
                type: processed.type,
                model: processed.model,
                platform: this,
                socket: socket
            }));
        }
    }
    
    public eventAdapter(event: any): EventAdapterOutput {
        return {
            type: event.type,
            model: event
        };
    }
}
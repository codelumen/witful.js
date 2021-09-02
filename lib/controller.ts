import Handler from './handler';
import Event from './event';


type ControllerConstructor = {
    id: string,
    callback: ControllerCallback,
    middlewares?: Handler[]
}
type ControllerCallback = (event: Event) => void;

export default class Controller {
    public id: string;
    public callback: ControllerCallback;
    public middlewares: Handler[];

    constructor(parameters: ControllerConstructor) {
        this.id = parameters.id;
        this.callback = parameters.callback;
        this.middlewares = parameters.middlewares || [];
    }
    
    public async use(event: Event) {
        for (let middleware of this.middlewares) {
            if (event.closed) return;
            event = await middleware.handle(event);
        }
        this.callback(event);
    }
}
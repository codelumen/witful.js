import Controller from "./controller";
import Event from "./event";
import Handler from "./handler";


type RouterBuild = {
    middlewares?: {
        [eventType: string]: Handler
    },
    controllers?: {
        [eventType: string]: Controller
    }
}


export default class Router {
    public middlewares = new Map<string, Handler[]>();
    public controllers = new Map<string, Controller[]>(); 

    public addMiddlewares(eventType: string | string[], middleware: Handler) {
        if (eventType instanceof Array) {
            for (let type of eventType) {
                let existing = this.middlewares[type];
                this.middlewares[type] = existing
                    ? existing.concat([ middleware ])
                    : [ middleware ];
            }
        } else {
            let existing = this.middlewares[eventType];
            this.middlewares[eventType] = existing
                ? existing.concat([ middleware ])
                : [ middleware ];
        }
    }

    public addControllers(eventType: string | string[], controller: Controller) {
        if (eventType instanceof Array) {
            for (let type of eventType) {
                let existing = this.controllers[type];
                this.controllers[type] = existing
                    ? existing.concat([ controller ])
                    : [ controller ];
            }
        } else {
            let existing = this.controllers[eventType];
            this.controllers[eventType] = existing
                ? existing.concat([ controller ])
                : [ controller ];
        }
    }

    public build(build: RouterBuild) {
        build.middlewares ||= {};
        build.controllers ||= {};
        for (let [eventType, middleware] of Object.entries(build.middlewares)) {
            this.addMiddlewares(eventType, middleware);
        }
        for (let [eventType, controller] of Object.entries(build.controllers)) {
            this.addControllers(eventType, controller);
        }
    }

    public async routeEvent(event: Event) {
        let middlewares = this.middlewares.get(event.type) || [];
        let controllers = this.controllers.get(event.type) || [];
        for (let middleware of middlewares) {
            if (event.closed) return;
            event = await middleware.handle(event);
        }
        for (let controller of controllers) {
            controller.use(event);
        }
    }
}

export class RouterWrapper {
    public router = new Router();

    public addMiddlewares(eventType: string | string[], middleware: Handler) {
        this.router.addMiddlewares(eventType, middleware);
    }

    public addControllers(eventType: string | string[], controller: Controller) {
        this.router.addControllers(eventType, controller);
    }

    public build(build: RouterBuild) {
        this.router.build(build);
    }

    public routeEvent(event: Event) {
        this.router.routeEvent(event);
    }
}
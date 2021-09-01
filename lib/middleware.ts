import Event from './event';


type MiddlewareHandler = (event: Event, send: (event: Event) => void) => void;

export default class Middleware {
    public handler: MiddlewareHandler;

    constructor(handler: MiddlewareHandler) {
        this.handler = handler;
    }

    public handle(event: Event): Event {
        this.handler(event, processedEvent => {
            event = processedEvent;
        });
        return event;
    }
}
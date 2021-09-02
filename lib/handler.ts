import Event from './event';


type HandlerCallback = (event: Event, send: (event: Event) => void) => void;

export default class Handler {
    public callback: HandlerCallback;

    constructor(callback: HandlerCallback) {
        this.callback = callback;
    }

    public handle(event: Event): Event {
        this.callback(event, processedEvent => {
            event = processedEvent;
        });
        return event;
    }
}
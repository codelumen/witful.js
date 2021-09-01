import Platform from './platform';


export type SocketConstructor = {
    client: any,
    dispatcher: (receive: (event: any) => void) => void,
    initialize?: () => void
}

export default class Socket {
    public platform: Platform;
    public client: any;

    constructor(platform: Platform, parameters: SocketConstructor) {
        this.platform = platform;
        this.client = parameters.client;
        if (parameters.initialize) {
            parameters.initialize();
        }
        parameters.dispatcher(event => {
            this.platform.redirectEvent(this, event);
        });
    }
}
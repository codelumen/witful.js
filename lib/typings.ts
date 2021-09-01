import Event from "./event";


export type Middleware = (event: Event) => Event;
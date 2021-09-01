import Event from "./event";
import Module from "./module";
import Platform from "./platform";
import { RouterWrapper } from "./router";


export default class App extends RouterWrapper {
    public platforms = [] as Platform[];
    public modules = [] as Module[];

    constructor() {
        super();
    }

    public connect(platform: Platform | Platform[], connected=false) {
        if (platform instanceof Array) {
            for (let p of platform) {
                if (!this.platforms.includes(p)) {
                    this.platforms.push(p);
                    if (!connected) p.connect(this);
                }
            }
        } else {
            if (!this.platforms.includes(platform)) {
                this.platforms.push(platform);
                if (!connected) platform.connect(this);
            }
        }
    }

    public bindModules(...modules: Module[]) {
        this.modules.concat(modules);
    }

    public async catchEvent(event: Event) {
        await this.router.routeEvent(event);
        for (let module of this.modules) {
            module.router.routeEvent(event);
        }
    }
}
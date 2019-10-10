import fs from "fs";
import yaml from "js-yaml";

interface IAuth {
    Header: string;
    Host: string;
}

interface IExternalApi {
    AuthHeader: string;
    AuthToken: string;
    Params: string;
    URL: string;
}

interface IServer {
    Port: number;
    Cache?: number;
    Debug: boolean;
}

class Settings {
    public Auth: IAuth;
    public ExternalApi: IExternalApi;
    public Server: IServer;

    public config = {
        Auth: {
            Header: "",
            Host: "",
        } as IAuth,
        ExternalApi: {
            AuthHeader: "",
            AuthToken: "",
            Params: "",
            URL: "",
        } as IExternalApi,
        Server: {
            Cache: 0,
            Debug: false,
            Port: 8801
        } as IServer,
    };

    constructor() {
        try {
            const configFile = process.env.NODE_ENV === "test" ? "./src/config/config.test.yml" : "./config/config.yml";
            const doc = yaml.safeLoad(fs.readFileSync(configFile, "utf8"));
            this.config = {...this.config, ...doc};

            this.Auth = this.config.Auth;
            this.Server = this.config.Server;
            this.ExternalApi = this.config.ExternalApi;
        } catch (e) {
            console.log(e);
            throw new Error("Config missing");
        }
    }
}

export default new Settings();

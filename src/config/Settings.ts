import dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

class Settings {
    public Auth = {
        Header: "",
        Host: "",
    };
    public Cache: number;
    public ApiHost: string;
    public Server = {
        Debug: false,
        Port: 8801
    };

    constructor() {
        if (!process.env.AUTH_HOST) {
            this.warnMessage("AUTH_HOST", "No auth host");
        } else {
            this.Auth.Host = process.env.AUTH_HOST;
        }
        if (!process.env.AUTH_HEADER) {
            this.warnMessage("AUTH_HEADER", "No auth header");
        } else {
            this.Auth.Header = process.env.AUTH_HEADER;
        }
        if (!process.env.CACHE) {
            this.warnMessage("CACHE", "no cache");
        } else {
        this.Cache = +process.env.CACHE;
        }
        if (!process.env.SERVER_PORT) {
            this.warnMessage("SERVER_PORT", "8801");
        } else {
            this.Server.Port = +process.env.SERVER_PORT;
        }

        if (!process.env.SERVER_DEBUG) {
            this.warnMessage("SERVER_DEBUG", "false");
        } else {
            this.Server.Debug = (process.env.SERVER_DEBUG === "true");
        }
        if (!process.env.API_HOST) {
            this.errMessage("API_HOST");
            throw new Error("No API_HOST");
        }

        this.ApiHost = process.env.API_HOST;
    }

    private errMessage = (key: string) => {
        console.log(`${key} is not configured`);
    }

    private warnMessage = (key: string, def: string) => {
        if (this.Server.Debug) { console.log(`${key} is not configured, using default: ${def}`); }
    }
}

export default new Settings();

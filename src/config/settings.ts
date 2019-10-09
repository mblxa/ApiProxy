import dotenv = require("dotenv");
dotenv.config();

const settings = () => {
    const values = {
        api_host: process.env.API_HOST,
        cache: process.env.CACHE,
        external_api_key: process.env.API_KEY,
        server: {
            debug: process.env.DEBUG || true,
            port: process.env.SERVER_PORT || 8801,
        },
    };

    const errMessage = (key: string) => {
        console.log(`${key} is not configured`);
    };
    const warnMessage = (key: string, def: string) => {
        console.log(`${key} is not configured, using default: ${def}`);
    };
    if (!values.external_api_key) {
        errMessage("API_KEY");
        throw new Error("API_KEY not set");
    }
    if (!values.api_host) {
        warnMessage("API_HOST", "skipping AuthMiddleware");
    }
    if (!values.cache) {
        warnMessage("CACHE", "disabled");
    }

    return values;
};

export default settings;

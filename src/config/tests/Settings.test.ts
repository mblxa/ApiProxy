import Settings from "../Settings";

describe("config:settings", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        OLD_ENV.AUTH_HOST = "123";
        OLD_ENV.CACHE = "123";
        OLD_ENV.API_HOST = "123";
        OLD_ENV.SERVER_DEBUG = "true";
        OLD_ENV.SERVER_PORT = "123";
        process.env = {...OLD_ENV};
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    test("checkSettings no API_HOST", () => {
        process.env.API_HOST = undefined;
        expect(Settings.AuthHost).toBe(undefined);
    });
    // test("checkSettings no external_api_key", () => {
    //     process.env.API_KEY = undefined;
    //     try {
    //         settings();
    //         expect(true).toBe(false);
    //     } catch (e) {
    //         expect(e.message).toBe("API_KEY not set");
    //     }
    // });
    // test("checkSettings no cache", () => {
    //     process.env.CACHE = undefined;
    //     expect(settings().cache).toBe(undefined);
    // });
    // test("checkSettings no server.port", () => {
    //     process.env.SERVER_PORT = undefined;
    //     expect(settings().server.port).toBe(8801);
    // });
    // test("checkSettings no server.debug", () => {
    //     process.env.DEBUG = "false";
    //     expect(settings().server.debug).toBe("false");
    // });
});

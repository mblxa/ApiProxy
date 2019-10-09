import nodeMocks from "node-mocks-http";
import CheckCacheMiddleware from "../CheckCacheMiddleware";

describe("middleware:CheckCacheMiddleware", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        OLD_ENV.CACHE = "123";
        process.env = {...OLD_ENV};
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    test("error", () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                city: "error",
                offset: 0,
            }
        });
        const res = nodeMocks.createResponse({
        });
        CheckCacheMiddleware(req, res, nextSpy);
        expect(nextSpy).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });

    test("cache no value", () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                city: "no",
                offset: 0,
            }
        });
        const res = nodeMocks.createResponse({
        });
        CheckCacheMiddleware(req, res, nextSpy);
        expect(nextSpy).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });

    test("cache value", () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                city: "value",
                offset: 0,
            }
        });
        const res = nodeMocks.createResponse({
        });
        CheckCacheMiddleware(req, res, nextSpy);
        expect(nextSpy).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });

    test("cache disabled", () => {
        process.env.CACHE = undefined;
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
        });
        const res = nodeMocks.createResponse({
        });
        CheckCacheMiddleware(req, res, nextSpy);
        expect(nextSpy).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });
});

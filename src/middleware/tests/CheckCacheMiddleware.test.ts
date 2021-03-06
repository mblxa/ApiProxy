import nodeMocks from "node-mocks-http";
import Settings from "../../config/Settings";
import CheckCacheMiddleware from "../CheckCacheMiddleware";

describe("middleware:CheckCacheMiddleware", () => {

    beforeAll(() => {
        Settings.Server.Cache = 10;
    });

    test("error", () => {
        Settings.ExternalApi.Params = "/:city/:offset";
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
        Settings.ExternalApi.Params = "/:city/:offset";
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
        Settings.Server.Cache = undefined;
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

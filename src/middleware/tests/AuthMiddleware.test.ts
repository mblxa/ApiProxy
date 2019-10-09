import nodeMocks from "node-mocks-http";
import AuthMiddleware from "../AuthMiddleware";
import Settings from "../../config/Settings";

describe("middleware:AuthMiddleware", () => {
    beforeAll(() => {
        Settings.AuthHost = '123';
    })

    test("no token", async () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = nodeMocks.createResponse({
        });
        await AuthMiddleware(req, res, nextSpy);
        expect(nextSpy).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(403);
    });
    test("invalid token", async () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json",
                "token": "invalid",
            }
        });
        const res = nodeMocks.createResponse({
        });
        await AuthMiddleware(req, res, nextSpy);
        expect(nextSpy).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(403);
    });

    test("valid token", async () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json",
                "token": "valid",
            }
        });
        const res = nodeMocks.createResponse({
        });
        await AuthMiddleware(req, res, nextSpy);
        expect(res.statusCode).toBe(200);
        expect(nextSpy).toHaveBeenCalled();
    });

    test("network problem", async () => {
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
            headers: {
                "Content-Type": "application/json",
                "token": "error",
            },
        });
        const res = nodeMocks.createResponse({
        });
        await AuthMiddleware(req, res, nextSpy);
        expect(res.statusCode).toBe(403);
        expect(nextSpy).not.toHaveBeenCalled();
    });
    test("auth disabled", async () => {
        Settings.AuthHost = undefined;
        const nextSpy = jest.fn();
        const req = nodeMocks.createRequest({
        });
        const res = nodeMocks.createResponse({
        });
        await AuthMiddleware(req, res, nextSpy);
        expect(res.statusCode).toBe(200);
        expect(nextSpy).toHaveBeenCalled();
    });
});

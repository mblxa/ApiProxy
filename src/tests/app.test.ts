import request from "supertest";
import app from "../app";

jest.mock("../middleware/AuthMiddleware", () => {
    return jest.fn().mockImplementation(async (req, res, next) => {
        next();
        return;
    });
});

jest.mock("../middleware/CheckCacheMiddleware", () => {
    return jest.fn().mockImplementation(async (req, res, next) => {
        res.locals.cachePath = "cache-path";
        res.locals.requestParams = ["p1=v1", "p2=v2"];
        next();
        return;
    });
});

describe("Test the root path", () => {

    test("It should response the GET method", (done) => {
        request(app).get("/").then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });

    test("custom path", (done) => {
        request(app).get("/p1/p2").then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
});

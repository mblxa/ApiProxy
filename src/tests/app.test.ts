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

    test("airport data", (done) => {
        request(app).get("/UMKK/0").then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
});

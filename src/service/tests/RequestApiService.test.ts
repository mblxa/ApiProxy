import Settings from "../../config/Settings";
import GetExternalApiData from "../RequestApiService";

describe("service:FlightService", () => {
    test("should work", async () => {
        Settings.ExternalApi.AuthHeader = "token";
        Settings.ExternalApi.AuthToken = "123";
        const data = await GetExternalApiData(["p1", "p2"]);

        expect(data).toEqual({});
    });

    test("should work without header", async () => {
        Settings.ExternalApi.AuthHeader = undefined;
        const data = await GetExternalApiData(["p1", "p2"]);

        expect(data).toEqual({});
    });
});

import Settings from "../../config/Settings";
import getFullData from "../RequestApiService";

describe("service:FlightService", () => {
    test("should work", async () => {
        Settings.ExternalApi.AuthHeader = "token";
        Settings.ExternalApi.AuthToken = "123";
        const data = await getFullData(["p1", "p2"]);

        expect(data).toEqual({});
    });
});

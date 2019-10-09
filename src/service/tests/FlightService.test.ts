import getFullData from "../FlightService";

describe("service:FlightService", () => {
    test("should work", async () => {
        const data = await getFullData("1", 0);

        expect(data).toEqual({});
    });

});

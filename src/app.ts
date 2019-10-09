import express = require("express");
import AuthMiddleware from "./middleware/AuthMiddleware";
import CheckCacheMiddleware from "./middleware/CheckCacheMiddleware";
import CacheService from "./service/CacheService";
import getFullData from "./service/FlightService";

const app: express.Application = express();

app.get("/:city/:offset", AuthMiddleware, CheckCacheMiddleware, async (req, res) => {
    const {city} = req.params;
    const {offset} = req.params;
    const path = `${city}-${offset}`;

    const data = await getFullData(city, +offset || 0);
    CacheService.set(path, data);

    res.set("Content-Type", "application/json");
    res.send(data);
});

export default app;

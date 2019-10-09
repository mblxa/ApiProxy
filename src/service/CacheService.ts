import NodeCache from "node-cache";
import settings from "../config/settings";

const CacheService = new NodeCache( { stdTTL: +settings().cache, checkperiod: 10 * 10 } );

export default CacheService;

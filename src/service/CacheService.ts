import NodeCache from "node-cache";
import Settings from "../config/Settings";

const CacheService = new NodeCache( { stdTTL: +Settings.Server.Cache, checkperiod: 10 * 10 } );

export default CacheService;

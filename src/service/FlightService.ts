import fetch from "isomorphic-unfetch";
import Settings from "../config/Settings";

const getFullData = async (city: string, offset: number) => {
    const options = {
        headers: {
            Authorization: `Basic ${Settings.ApiHost}`
        }
    };

    return await fetch(`https://flightxml.flightaware.com/json/FlightXML3/AirportBoards?airport_code=${city}&offset=${offset}&howMany=30`, options)
        .then((r) => r.json())
        .catch(() => ({}));
};

export default getFullData;

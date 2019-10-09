import fetch from "isomorphic-unfetch";
import settings from "../config/settings";

const getFullData = async (city: string, offset: number) => {
    const options = {
        headers: {
            Authorization: `Basic ${settings().external_api_key}`
        }
    };

    return await fetch(`https://flightxml.flightaware.com/json/FlightXML3/AirportBoards?airport_code=${city}&offset=${offset}&howMany=30`, options)
        .then((r) => r.json())
        .catch(() => ({}));
};

export default getFullData;

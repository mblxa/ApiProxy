import fetch from "isomorphic-unfetch";
import Settings from "../config/Settings";

const getFullData = async (requestParams: string[]) => {
    let options;
    if (Settings.ExternalApi.AuthHeader) {
        options = {
            headers: {
                [Settings.ExternalApi.AuthHeader]: Settings.ExternalApi.AuthToken
            }
        };
    }

    const urlParams = requestParams.join("&");

    return await fetch(`${Settings.ExternalApi.URL}&${urlParams}`, options)
        .then((r) => r.json())
        .catch(() => {
            console.log("3rd party api request error");
            return {};
        });
};

export default getFullData;

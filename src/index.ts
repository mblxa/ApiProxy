import app from "./app";
import Settings from "./config/Settings";

app.listen(Settings.Server.Port, () => {
    // tslint:disable-next-line:no-console
    console.log("Listening on port 8801!");
});

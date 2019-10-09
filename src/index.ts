import app from "./app";
import settings from "./config/settings";

if (settings()) {
    app.listen(settings().server.port, () => {
        // tslint:disable-next-line:no-console
        console.log("Listening on port 8801!");
    });
}

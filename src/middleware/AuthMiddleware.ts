import express = require("express");
import fetch from "isomorphic-unfetch";
import Settings from "../config/Settings";

const AuthMiddleware: express.RequestHandler = async (req, res, next) => {
    if (!Settings.Auth.Host || !Settings.Auth.Header) {
        return next();
    }

    const authHeaderValue = req.header(Settings.Auth.Header);

    if (!authHeaderValue) {
        res.status(403).end();
        return;
    }

    const auth = await fetch(`${Settings.Auth.Host}`, {headers: {[Settings.Auth.Header]: authHeaderValue}})
        .catch(() => ({status: 403}));

    if (auth.status === 403) {
        res.status(403).end();
        return;
    }

    next();
};

export default AuthMiddleware;

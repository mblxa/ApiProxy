import express = require("express");
import fetch from "isomorphic-unfetch";
import settings from "../config/settings";

const AuthMiddleware: express.RequestHandler = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        res.status(403).end();
        return;
    }

    const auth = await fetch(`${settings().api_host}`, {headers: {token}}).catch(() => ({status: 403}));

    if (auth.status === 403) {
        res.status(403).end();
        return;
    }

    next();
};

export default AuthMiddleware;

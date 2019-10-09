import {Response} from "node-fetch";

const isomorphicUnfetch = async(url: string, options: any) => {
    if (!options.headers.token || options.headers.token=== 'invalid') return Promise.resolve(new Response('', {status: 403}))

    if (options.headers.token === "error") return Promise.reject(new Response('', {status: 403}))


    return Promise.resolve(new Response('', {status: 200}))
};

export default isomorphicUnfetch;

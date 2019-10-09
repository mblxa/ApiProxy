class nodeCache {
    get(path: string, callback: (err: string, value: string) => void) {
        if (path ==='error-0') {
            callback('err', null);
        }

        if (path === 'no-0') {
            callback(null, undefined);
        }

        if (path === 'value-0') {
            callback(null, 'value');
        }
    }

    set() {
        return;
    }
}

export default nodeCache;

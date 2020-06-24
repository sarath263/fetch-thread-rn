import Thread from "./Thread";

const callApi = (url, requestData) => {
    return new Promise((resolve, reject) => {
        // start a new react native JS process
        const thread = new Thread("./method.js");
        // send a message, strings only
        thread.postMessage(JSON.stringify({ url, requestData }));
        // listen for messages
        thread.onmessage = (response) => {
            let result = response;
            if (
                /^[\],:{}\s]*$/.test(
                    response
                        .replace(/\\["\\\/bfnrtu]/g, "@")
                        .replace(
                            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            "]"
                        )
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                )
            ) {
                result = JSON.parse(response);
            }
            resolve(result);
            // stop the JS process
            thread.terminate();
        };
    });
};
export default callApi;

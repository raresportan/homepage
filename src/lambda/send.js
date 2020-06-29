const { default: fetch } = require("node-fetch"); //See https://github.com/bitinn/node-fetch/issues/450

// Based on https://github.com/dennishagemeier/d-hagemeier/blob/master/functions/send/send.js
// See https://www.d-hagemeier.com/en/articles/cookie-free-google-analytics/
exports.handler = async (event) => {
    // we accept only post
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body);
    const allowedDomain = "raresportan";
    const origin = data.origin;

    // we accept only requests from the allowed domain
    if (!origin.includes(allowedDomain)) {
        return { statusCode: 403, body: "Invalid Domain" };
    }

    const url = origin + data.pathname + data.search;

    // create a hash to be used as sessionid
    const hash = require("crypto")
        .createHash("sha256")
        .update(data.useragent + data.screensize + data.offset + data.language)
        .digest("hex");


    const endpoint = "https://www.google-analytics.com/collect";
    const payload = encodeURI(
        `v=1&t=pageview&tid=UA-166862236-1&cid=${hash}&ua=${data.useragent}&aip=1&ds=web&dl=${url}&dt=${data.title}&ul=${data.language}&dr=${data.referrer}`
    ).replace(/\//g, "%2F");

    try {
        const response = await fetch(`${endpoint}?${payload}`, {
            method: "POST",
            cache: "no-cache",
        });
        console.log(response);
        if (response.ok) {
            return { statusCode: response.status, body: response.statusText };
        }
    } catch (err) {
        return { statusCode: 500, body: "NOK" };
    }
};
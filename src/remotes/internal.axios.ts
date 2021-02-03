/**
 * @file Setting up connection configs to server-side
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import Axios from "axios";

const server = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export const authAxios = Axios.create({
    baseURL: server,
    headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
        "Access-Control-Allow-Origin": `http://ec2-34-204-205-63.compute-1.amazonaws.com:80`
    },
});

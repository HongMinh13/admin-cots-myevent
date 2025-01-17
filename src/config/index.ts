import * as dotenv from "dotenv";

dotenv.config();

// local
const API_URL = "http://127.0.0.1:3000/graphql";


// const DOMAIN = "https://filmatron-client.vercel.app"
// local
const DOMAIN = "http://127.0.0.1:3001"
console.log(
    `API_URL: ${API_URL}`,
    `DOMAIN: ${DOMAIN}`,
    `APP_HOST: ${process.env.NEXT_PUBLIC_APP_HOST}`,
    `APP_PORT: ${process.env.NEXT_PUBLIC_APP_HOST}`,
    `CAMILLE_SERVER_URL: ${process.env.NEXT_PUBLIC_CAMILLE_SERVER_URL}`,
);
export const config = {
    clientDomain: process.env.NEXT_PUBLIC_CLIENT_APP_HOST,
    restfulUrl: process.env.NEXT_PUBLIC_FILMATRON_REST_SERVER_URL,
    domain: process.env.NEXT_PUBLIC_APP_HOST ?? DOMAIN,
    port: process.env.NEXT_PUBLIC_APP_HOST ?? 3000,
    apiUrl: process.env.NEXT_PUBLIC_CAMILLE_SERVER_URL ?? API_URL,
    admin: {
        // wallet address that admin will sign transaction when film maker action create a collection for their NFT collection
        publickKey:
            process.env.NEXT_PUBLIC_ADMIN_PUBLICK_KEY ??
            "89Fh4QKhCEJ5rC1Bf4utchfmqPNejYTfjoW6VxDL8YqB",
    },
};

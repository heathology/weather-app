const APP_ENV = "dev"; // change when pushed to production
const PROXY_PORT = 5000;
const PROD_SERVER_URL = ""; //set to production server URL

const config = {
  PROXY_SERVER_URL:
    APP_ENV == "dev" ? `http://localhost:${PROXY_PORT}/api` : PROD_SERVER_URL,
};

export default config;

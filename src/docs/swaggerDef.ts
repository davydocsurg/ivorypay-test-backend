import { name, version, repository } from "../../package.json";
import config from "../config/config";

const swaggerDef = {
    openapi: "3.0.0",
    info: {
        title: `${name} API documentation`,
        version,
        license: {
            name: "MIT",
            url: repository.url,
        },
    },
    servers: [
        {
            url: `${config.baseUrl}/api/v1`,
        },
    ],
};

export default swaggerDef;

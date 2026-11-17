import app from "./app.js";
import ENV from "./config/env.config.js";

const start = async () => {
    try {
        await app.listen({
            port: ENV.port.appPort,
            host: "localhost",
        });

        console.log("Server is running...");
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();

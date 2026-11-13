import Fastify from "fastify";
import ENV from "./config/env.config.js";

const fastify = Fastify(
    {
        logger : false,
    }
);

fastify.get('/',(req,res) => {
    return {
        message : "default route "
    }
})

const start = async () => {
    try{
        await fastify.listen({
            port: ENV.port.appPort,
            host: "localhost"
        });
        console.log("Server is running....");
        
    }catch(error){
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
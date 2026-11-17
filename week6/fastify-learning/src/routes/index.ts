import { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./user.routes.js";

const routes : FastifyPluginAsync = async(app) => {
    app.register(userRoutes,{
        prefix : '/users',
    })
}

export default routes;
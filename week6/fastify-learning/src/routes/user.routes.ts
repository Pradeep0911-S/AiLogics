import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

export const userRoutes : FastifyPluginAsync = async(app) =>{
    app.get('/',async(request : FastifyRequest ,reply : FastifyReply)=>{
        return {
            message : "user fetchend successfully"
        };
    });
    app.get('/:id',async(request : FastifyRequest,reply:FastifyReply)=>{
        return {
            message : "single user fetched",
        };
    });
}

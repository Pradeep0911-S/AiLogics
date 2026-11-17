import dotenv from "dotenv";
dotenv.config();

const ENV = {
    port : {
        appPort : Number(process.env.PORT) || 3001
    }
}

export default ENV;
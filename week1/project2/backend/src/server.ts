import {createApp} from './app'
import './config/env.js'
import { connectDatabase } from "./config/db.js";


const PORT = process.env.PORT || 3001
const app = createApp();


async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

startServer();
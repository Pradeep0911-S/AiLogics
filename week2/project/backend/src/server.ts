import { createApp } from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

const app = createApp();

const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port http://localhost:${ENV.PORT}`);
  });
};

startServer();
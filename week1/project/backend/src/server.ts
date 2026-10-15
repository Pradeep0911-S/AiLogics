
import { createApp } from './app.js';
import './config/env.js';
import { sequelize } from './config/sequelize.js';
import { initUser } from './models/user.js';

const PORT = process.env.PORT || 3001;
const app = createApp();

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    initUser(sequelize);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
  }
}

startServer();

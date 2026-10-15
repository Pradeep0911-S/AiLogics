
import 'dotenv/config';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './sequelize.js';
import { pathToFileURL } from 'node:url';

export const migrator = new Umzug({
  migrations: {
    glob: 'src/migrations/*.ts',

    resolve: ({ name, path, context }) => {
      const migration = import(pathToFileURL(path!).href);

      return {
        name,
        up: async () => (await migration).default.up(context, {}),
        down: async () => (await migration).default.down(context, {}),
      };
    },
  },

  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await migrator.up();
    console.log('Migrations completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

runMigrations();

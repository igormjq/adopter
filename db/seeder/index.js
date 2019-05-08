import chalk from 'chalk';
import createRoles from './create-roles';
import createUsers from './create-users';
import createAnimals from './create-animals';

const log = console.log;

const seedDatabase = async () => {
  log(chalk.green('Seeding database'));

  try {
    log(chalk.yellow('Creating User Roles...'));
    await createRoles();
    log("OK ✅");
    log(chalk.yellow('Creating Users...'));
    await createUsers();
    log("OK ✅");
    log(chalk.yellow('Creating Animals...'));
    await createAnimals();
    log("OK ✅");
    log(chalk.green('Finished seeding 🚀'))
  } catch(err) {
    throw new Error(err);
  }
  
};

seedDatabase();
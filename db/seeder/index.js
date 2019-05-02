import chalk from 'chalk';
import createRoles from './create-roles';
import createUsers from './create-users';

const log = console.log;

const seedDatabase = async () => {
  log(chalk.green('Seeding database'));

  try {
    log(chalk.yellow('Creating User Roles...'));
    await createRoles();
    console.log("OK");
    log(chalk.yellow('Creating Users...'));
    await createUsers();
  } catch(err) {
    throw new Error(err);
  }
  
};

seedDatabase();
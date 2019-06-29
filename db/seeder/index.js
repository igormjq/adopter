import chalk from 'chalk';
import createRoles from './create-roles';
import createUsers from './create-users';
import createAnimals from './create-animals';
import createAdoptionRequests from './create-adoption-requests';

const log = console.log;
const args = process.argv.includes('-t');

const mapModelToSeeder = {
  animals: async () => await createAnimals(),
  users: async () => await createUsers(),
  roles: async () => await createRoles(),
  adoptionRequests: async () => await createAdoptionRequests(),
};

const seedDatabase = async model => {

  log(chalk.green('Seeding database'));

  if(model) {
    log(chalk.yellow(`Creating ${model}...`));
    mapModelToSeeder[model]();
    log("OK ✅");
    return;
  };

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
    log(chalk.yellow('Creating Adoption Requests...'));
    await createAdoptionRequests();
    log("OK ✅");
    log(chalk.green('Finished seeding 🚀'))
  } catch(err) {
    throw new Error(err);
  }
  
};

if(args) {
  const models = process.argv.splice(process.argv.indexOf('-t') + 1);
  const keys = Reflect.ownKeys(mapModelToSeeder);

  models.forEach(model => {
    if(keys.includes(model)) {
      seedDatabase(model);
    }  
  });
} else {
  seedDatabase();
}
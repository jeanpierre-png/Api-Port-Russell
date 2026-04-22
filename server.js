require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');
const { execSync } = require('child_process')

const startServer = async () => {
  try {
    await connectDB();

    console.log("Exécution des tests..");

    try {
      const result = execSync('npm test', { encoding: 'utf8'});
      console.log(result);
    } catch (error) {
      console.log(error.stdout);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });

  } catch (error) {
    console.error('Erreur au démarrage du serveur:', error);
    process.exit(1);
  }

};

startServer();
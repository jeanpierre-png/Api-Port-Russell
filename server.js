require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const startServer = async () => {
  try {
    await connectDB();

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
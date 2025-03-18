import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

// import express from 'express';

// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send('<h1>Home</h1>');
// });
// app.get('/contacts', (req, res) => {
//   res.send('<h2>Contacts</h2>');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app;

server.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

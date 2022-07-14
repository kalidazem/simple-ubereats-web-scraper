const app = require("./app");

const port = process.env.PORT || 3000;

let server = app;

server.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

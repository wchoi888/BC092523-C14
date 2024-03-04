const path = require("path");
// Export a function that defines a route handler for the root URL '/'
module.exports = (app) =>
  app.get("/", (req, res) =>
    // Send the index.html file located in the client/dist directory as a response
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );

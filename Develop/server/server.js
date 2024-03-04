const express = require("express");
// Create an Express application
const app = express();
// Define the port number to listen on, default to 3000 if not provided by environment variable
const PORT = process.env.PORT || 3000;
// Serve static files from the client/dist directory
app.use(express.static("../client/dist"));
// Parse URL-encoded bodies and JSON bodies for requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Require and use the HTML routes defined in htmlRoutes.js
require("./routes/htmlRoutes")(app);
// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

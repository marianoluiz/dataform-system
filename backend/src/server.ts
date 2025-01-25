// commonjs or esm dont matter in typescript
// dont need to define type: module,  in package
const express = require("express");
const db = require("./config/database"); 
// any exported will run automatiucally thats 
// why isee something in the console

// Routes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.app;
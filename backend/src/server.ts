// commonjs or esm dont matter in typescript
// dont need to define type: module,  in package

// any exported will run automatiucally thats 
// why isee something in the console
import express from "express";
import studentRoute from "./routes/studentRoute";

// Routes
const app = express();
const PORT = process.env.SERVER_PORT; // no need dotenv.config

// Middleware to parse (destringify the json)
app.use(express.json());

app.use("/api", studentRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
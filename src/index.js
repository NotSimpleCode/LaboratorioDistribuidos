import express from "express";
import cors from "cors";
import userRolesRoutes from "./routes/roles_users_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', userRolesRoutes);

app.listen(3000)
console.log('Server on port',3000)
import express from "express";
import cors from "cors";
import userRolesRoutes from "./routes/roles_routers_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', userRolesRoutes);

app.listen(3000)
console.log(process.env.PORT||3000)
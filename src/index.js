import express from "express";
import cors from "cors";
import rolesRoutes from "./routes/roles_routers_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', rolesRoutes);

app.listen(process.env.PORT || 3000);
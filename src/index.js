import express from "express";
import cors from "cors";
import userRoutes from "./routes/users_routers.js";
import rolesRoutes from "./routes/roles_routers_routes.js";
import typeDocumentsRoutes from "./routes/type_document_routes.js";
import userRolesRoutes from "./routes/roles_users_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', rolesRoutes);

app.listen(3000)
console.log('Server on port',3000)
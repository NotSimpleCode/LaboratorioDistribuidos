import express from "express";
import cors from "cors";
import userRoutes from "./routes/users_routers.js";
import rolesRoutes from "./routes/roles_routers_routes.js";
import typeDocumentsRoutes from "./routes/type_document_routes.js";
import userRolesRoutes from "./routes/roles_users_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRoutes);
app.use(rolesRoutes);
app.use(typeDocumentsRoutes);
app.use(userRolesRoutes);

const port = process.env.PORT || 3000; // Usa el puerto proporcionado por Azure o el puerto 3000 si no está definido

app.listen(port, () => {
  console.log('Server is running on port', port);
});


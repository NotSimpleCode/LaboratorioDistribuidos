import express from "express";
import cors from "cors";
import rolesRoutes from "./routes/roles_routers_routes.js";
import tiposDocumentos from "./routes/type_document_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', rolesRoutes);
app.use('/api', tiposDocumentos);

app.listen(process.env.PORT || 3000);
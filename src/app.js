import express from "express"
import morgan from "morgan"

//Routes
import languageRoutes  from "./routes/lenguage.routes"

const app =  express();

//settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json()) //Entender y procesar json
//Routes
app.use("/api/languageRoutes",languageRoutes)

export default app;
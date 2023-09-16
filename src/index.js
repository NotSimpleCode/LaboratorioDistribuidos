import app from "./app"
// Ejecución de servidor
const main = () => {
    app.listen(app.get("port"))
    console.log(`Server on port ${app.get("port")}`)
};

main()
import mysql from 'mysql'
let todos 

//Crear la conexión
const conector = mysql.createConnection(
    {
        host: 'localhost',
        user: 'JorgeMz',
        password: 'JEMz032002',
        database: 'agenda_contactos'
    }
)

const conectar = () => {
    conector.connect(err =>{
        if(err) throw err
        console.log('conectado')
    })
}

const agregarContacto = (nombre, numero) => {
    const sql = `INSERT INTO agenda_personal(id_agenda, nombre_contacto, numero_contacto ) 
    VALUES (${null},"${nombre}",${numero})`
    conector.query(sql,function(err, result, filed){
        if(err) throw err
        console.log(result)
    })
}

const obtenerConctactos = ()=>{
    const sql = 'SELECT * FROM agenda_personal'
    conector.query(sql, function(err, result, field){
        todos = result
    })
    return todos
}

const borrarContacto = id =>{
    const sql = `DELETE FROM agenda_personal where id_agenda=${id}`
    conector.query(sql)
}

//exportar archivos para usarla en nuestro archivo index
export {agregarContacto,obtenerConctactos,borrarContacto}

import peewee
from distutils.log import debug
from flask import Flask, jsonify, request
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#cert_path = os.path.join(BASE_DIR, "DigiCertGlobalRootCA.crt.pem")

#conexion con Azure
#conexion = peewee.MySQLDatabase(user="Diego", password="Uptc1234", host="mysqlconexion.mysql.database.azure.com", port=3306, database="bd-mysql-uptc", ssl_ca=cert_path, ssl_disabled=False)

#conexion con SQLlite
urlbase = os.path.join(BASE_DIR, "clientes.db")
conexion = peewee.SqliteDatabase("clientes.db")

#ORM en progreso
class TipoDocumento(peewee.Model):
    id_tipo_documento = peewee.PrimaryKeyField(11)
    tipo_documento = peewee.CharField(30)
    class Meta:
        database = conexion
        db_table = "TIPO_DOCUMENTOS"

class USUARIO(peewee.Model):
    documento_usuario = peewee.PrimaryKeyField(11)
    tipo_documento_usuario = peewee.IntegerField(11)
    nombre_usuario = peewee.CharField(30)
    apellido_usuario = peewee.CharField(30)
    celular_usuario = peewee.IntegerField(11)
    fecha_registro_usuario = peewee.CharField(30)
    estado_usuario = peewee.CharField(1)
    direccion_usuario = peewee.CharField(100)
    fecha_nacimiento_usuario = peewee.CharField(30)
    class Meta:
        database = conexion
        db_table = "USUARIOS"


@app.route("/Usuario")
def Usuario():
    return jsonify({'mensaje' : "Usuario logueado exitosamente!"})



@app.route("/Usuario/listar")
def listarUsuarios():

    Usuarios = USUARIO.select(USUARIO, TipoDocumento).join(TipoDocumento, attr = 'tip', on=(USUARIO.tipo_documento_usuario == TipoDocumento.id_tipo_documento)).where(USUARIO.estado_usuario == 'A').execute()
  
    
    str = [{'documento_usuario': Usuario.documento_usuario,'tipo_documento' : Usuario.tip.tipo_documento,'nombre_usuario' : Usuario.nombre_usuario,'apellido_usuario' : Usuario.apellido_usuario,'celular' : Usuario.celular_usuario,'Fecha Registro' : Usuario.fecha_registro_usuario,'estado' : Usuario.estado_usuario, 'direccion':Usuario.direccion_usuario, 'fecha_nacimiento': Usuario.fecha_nacimiento_usuario} for Usuario in Usuarios]


    return jsonify(str)

@app.route("/Usuario/registrar", methods=["POST"])
def registrarUsuario(): 
    id_est = request.json['documento_usuario']
    tipo_doc, nom_est, ape_est,celular,esta,fech_regis, direc, fech_nac = getInfo()
    msg = 'Usuario creado con exito'
    try:
        USUARIO.create(documento_usuario = id_est, tipo_documento_usuario = tipo_doc, 
                       nombre_usuario = nom_est, apellido_usuario = ape_est, celular_usuario = celular, 
                       fecha_registro_usuario = fech_regis,estado_usuario = esta, direccion_usuario = direc, 
                       fecha_nacimiento_usuario = fech_nac )
    except:
        msg = 'El usuario ya existe, no se ha podido crear'
        
    return jsonify({'mensaje' : msg})

def getInfo():
    tipo_doc = request.json['tipo_documento_usuario']
    nom_est = request.json['nombre_usuario']
    ape_est = request.json['apellido_usuario']
    cel = request.json['celular_usuario']
    esta = request.json['estado_usuario']
    fech_re = request.json['fecha_registro_usuario']
    dire = request.json['direccion_usuario']
    fech_nac = request.json['fecha_nacimiento_usuario']
    return tipo_doc,nom_est,ape_est,cel,esta, fech_re, dire, fech_nac

@app.route('/Usuario/actualizar/<codigo>', methods=["PUT"])
def actualizarUsuario(codigo):
    
    tipo_doc, nom_est, ape_est,celular,esta,fech_regis, direc, fech_nac = getInfo()

    USUARIO.update(tipo_documento_usuario = tipo_doc, 
                       nombre_usuario = nom_est, apellido_usuario = ape_est, celular_usuario = celular, 
                       fecha_registro_usuario = fech_regis,estado_usuario = esta, direccion_usuario = direc, 
                       fecha_nacimiento_usuario = fech_nac).where(USUARIO.documento_usuario == codigo).execute()
    
    return jsonify({'mensaje' : "Usuario/s actualizado/s"})

@app.route('/Usuario/actualizar/estado/<codigo>', methods=["PATCH"])
def actualizarUsuarioE(codigo):
    
    esta = request.json['estado_usuario']

    USUARIO.update(estado_usuario = esta).where(USUARIO.documento_usuario == codigo).execute()
    
    return jsonify({'mensaje' : "Estado del Usuario actualizado"})


@app.route('/Usuario/eliminar/<codigo>', methods=["DELETE"])
def eliminarUsuario(codigo):

    try:
        USUARIO.delete().where(USUARIO.documento_usuario == codigo).execute()
    except:
        USUARIO.update(estado = 'E').where(USUARIO.documento_usuario == codigo).execute()

    return jsonify({'mensaje' : "Usuario eliminado"})

if __name__ == "__main__":
    app.run(debug=True)
import jwt from 'jsonwebtoken';
// Secreto para firmar el token. Deberías cambiarlo en un entorno de producción.
const secretKey = 'your-secret-key';

// Función para generar un token JWT
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '48h' }); // Cambia la duración según tus necesidades
}

// Middleware de autenticación
function authenticateToken(req, res, next) {
  // Obtén el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'No está autorizado. Por favor, inicie sesión.' });
  }

  try {
    // Verifica el token y obtén la información del usuario
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Agrega la información del usuario a la solicitud para su posterior uso
    next(); // Continúa con la ejecución de la solicitud
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export{authenticateToken, generateToken}

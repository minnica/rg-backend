// controllers/auth.controller.js
import Employee from '../models/employees.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await Employee.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      {
        id: user.id_employee,
        name: user.full_name,
        position: user.position,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000,
    });

    res.json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hashedPassword });
  await user.save();
  res.status(201).send({ message: 'Usuário registrado com sucesso' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(senha, user.senha)) {
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);
    res.send({ token });
  } else {
    res.status(400).send({ message: 'Senha incorreta' });
  }
});

module.exports = router;

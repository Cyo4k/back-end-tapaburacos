const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Criar reporte
router.post('/', async (req, res) => {
  const { autor, endereco, imagem, descricao } = req.body;
  const report = new Report({ autor, endereco, imagem, descricao, status: 'pendente' });
  await report.save();
  res.status(201).send(report);
});

// Listar reportes
router.get('/', async (req, res) => {
  const reports = await Report.find();
  res.send(reports);
});

module.exports = router;

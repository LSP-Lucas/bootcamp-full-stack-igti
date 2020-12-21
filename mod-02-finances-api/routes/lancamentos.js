import express from 'express';
import { inserirLancamento, totalMes } from '../controllers/lancamentosController.js';

const router = express.Router();

router.post("/receita", async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/despesa", async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body, "D"));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/totalMes/:mes", async (req, res) => {
  try {
    res.send(await totalMes(parseInt(req.params.mes)));
  } catch (error) {
    res.status(400).send(error.message);
  }
})

export default router;
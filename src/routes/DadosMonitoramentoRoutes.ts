import { Router } from "express";
import { getObterDadosMonitoramento } from "../controllers/DadosMonitoramentoController";

const router: Router = Router();

router.get("/dadosMonitoramento", getObterDadosMonitoramento);

export default router;
import { TipoConsulta } from "../enums/TipoConsultaEnum";
import { Request, Response } from 'express';
import { DadosMonitoramentoQueryParams } from "../queryParams/DadosMonitoramentoQueryParams";
import { MonitoramentoService } from "../services/MonitoramentoService";

export const getObterDadosMonitoramento = async (req: Request, res: Response) => {
    const requestData = parseMonitoramentoRequest(req);
    console.log(requestData);

    try {
        if (requestData == null)
            throw Error("DataInicial, DataFinal e CodigoBanco são obrigatórios!");

        res.status(200).json(await new MonitoramentoService().ObterDadosMonitoramento(requestData));

    } catch (error: any) {
        res.status(400).json({
            message: 'Ocorreu um erro ao processar a requisição: ' + error.message
        });
    }
}

function parseMonitoramentoRequest(req: Request): DadosMonitoramentoQueryParams | null {
    var model: DadosMonitoramentoQueryParams | null = new DadosMonitoramentoQueryParams();

    model.DataInicial = new Date(req.query.DataInicial as string);
    model.DataFinal = new Date(req.query.DataFinal as string);

    model.Tipo = req.query.Tipo ? Number(req.query.Tipo) as TipoConsulta : null;
    model.CodigoBanco = req.query.CodigoBanco as string;

    if (!model.DataInicial || !model.DataFinal || !model.CodigoBanco)
        model = null;

    return model;
}
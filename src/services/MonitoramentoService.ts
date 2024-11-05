import { BancoEnum } from "../enums/bancoEnum";
import { StatusCodeMonitoramentoSucesso } from "../enums/StatusCodeMonitoramentoSucesso";
import { TipoConsulta } from "../enums/TipoConsultaEnum";
import { BoletoRequestFactory } from "../factories/BoletoRequestFactory";
import { BancoModel } from "../models/BancoModel";
import { MonitoramentoRepository } from "../repositories/MonitoramentoRepository";
import { DadosRequestBoletoModel } from "../models/DadosRequestBoletoModel";
import { BoletoService } from "./BoletoService";
import { DadosMonitoramentoQueryParams } from "../queryParams/DadosMonitoramentoQueryParams";

export class MonitoramentoService {
    private boletoRequestFactory = new BoletoRequestFactory();
    private monitoramentoRepository = new MonitoramentoRepository();
    private boletoService = new BoletoService();

    async IniciarMonitoramento() {
        Object.values(BancoEnum).forEach(async codigoBanco => {
            var requestBanco = await this.boletoRequestFactory.ObterDadosRequestBoletoModel(codigoBanco);

            if (requestBanco != null) {
                console.log(`Executando monitoramento em ${requestBanco.Banco.Codigo} - ${requestBanco.Banco.Nome}`)
                await this.RegistrarBoleto(requestBanco);
                await this.ObterBoleto(requestBanco);
            }
        });
    }


    async ObterDadosMonitoramento(request: DadosMonitoramentoQueryParams) {

        console.log("Tipo: " + request.Tipo);

        const filter: any = {
            CriadoEm: { $gte: request.DataInicial, $lte: request.DataFinal },
            Codigo: request.CodigoBanco
        }

        if (request.Tipo == undefined)
            filter.Tipo = request.Tipo;

        console.log(filter);

        return this.monitoramentoRepository.getByFilter(filter);
    }

    private async RegistrarBoleto(requestBanco: DadosRequestBoletoModel) {
        const horaInicioRequisicao = Date.now();
        var responseIncluirBoleto = await this.boletoService.RegistrarBoleto(requestBanco);
        const horaFimRequisicao = Date.now();

        await this.SalvarDadosMonitoramento(responseIncluirBoleto, horaFimRequisicao - horaInicioRequisicao, requestBanco.Banco, TipoConsulta.Registro);
    }

    private async ObterBoleto(requestBanco: DadosRequestBoletoModel) {
        const horaInicioRequisicao = Date.now();
        var responseIncluirBoleto = await this.boletoService.ObterBoleto(requestBanco);
        const horaFimRequisicao = Date.now();

        await this.SalvarDadosMonitoramento(responseIncluirBoleto, horaFimRequisicao - horaInicioRequisicao, requestBanco.Banco, TipoConsulta.Consulta);
    }

    private async SalvarDadosMonitoramento(response: any, duracao: number, bancoModel: BancoModel, tipo: TipoConsulta) {
        var statusCodeSucesso = response.status >= 200 && response.status < 300;
        var requisicaoSucesso = this.RequisicaoComSucesso(response.status);
        var payloadResponse = statusCodeSucesso ? response.data : response.response.data;

        await this.monitoramentoRepository.create(bancoModel.Codigo, bancoModel.Nome, tipo, response.status, duracao, JSON.stringify(payloadResponse), !requisicaoSucesso);
    }

    private RequisicaoComSucesso(statusCode: number) {
        return Object.values(StatusCodeMonitoramentoSucesso).includes(statusCode);
    }
}

import axios from "axios";
import { DadosRequestBoletoModel } from "../models/DadosRequestBoletoModel";
import { HeaderPlugBoletoModel } from "../models/HeaderPlugBoletoModel";

export class BoletoService {
    private readonly urlPlugBoleto = process.env.URL_PLUG_BOLETO || "";
    private readonly excecoesRede = ['ECONNRESET', 'EHOUSTUNREACH'];

    async RegistrarBoleto(requestBanco: DadosRequestBoletoModel) {
        try {
            console.log(`RegistrarBoleto ${requestBanco.Banco.Codigo}-${requestBanco.Banco.Nome}`);
            return await axios.post(this.urlPlugBoleto + "/boletos/lote", [requestBanco.RequestBoleto], { headers: this.ObterHeader(requestBanco.HeaderPlugBoleto) });
        } catch (error: any) {
            console.log(`Exception RegistrarBoleto ${requestBanco.Banco.Codigo}-${requestBanco.Banco.Nome}`);
            return this.TratarExcecoesRede(error);
        }
    }

    async ObterBoleto(requestBanco: DadosRequestBoletoModel) {
        try {
            console.log(`ObterBoleto ${requestBanco.Banco.Codigo}-${requestBanco.Banco.Nome}`);
            return await axios.get(`${this.urlPlugBoleto}/boletos?idintegracao=${requestBanco.IdIntegracao}`, { headers: this.ObterHeader(requestBanco.HeaderPlugBoleto) });

        } catch (error: any) {
            console.log(`Exception ObterBoleto ${requestBanco.Banco.Codigo}-${requestBanco.Banco.Nome}`);
            return this.TratarExcecoesRede(error);
        }
    }

    private ObterHeader(headerPlugBoleto: HeaderPlugBoletoModel) {
        return {
            'cnpj-cedente': headerPlugBoleto.CnpjCedente,
            'token-sh': headerPlugBoleto.TokenSh,
            'cnpj-sh': headerPlugBoleto.CnpjSh
        }
    }

    private TratarExcecoesRede(error: any) {

        if (this.excecoesRede.includes(error.code)) {
            error.status = 500;
            error.message += `. Erro de conexão (${error.code})`;
        }

        return error;
    }
}
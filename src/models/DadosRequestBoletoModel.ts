import { BancoModel } from "./BancoModel";
import { HeaderPlugBoletoModel } from "./HeaderPlugBoletoModel";
import { RequestBoletoModel } from "./RequestBoletoModel";

export class DadosRequestBoletoModel {
    RequestBoleto: RequestBoletoModel;
    IdIntegracao: String;
    HeaderPlugBoleto: HeaderPlugBoletoModel;
    Banco: BancoModel

    constructor(requestBoleto: RequestBoletoModel, headerPlugBoleto: HeaderPlugBoletoModel, idIntegracao: string, banco: BancoModel) {
        this.RequestBoleto = requestBoleto;
        this.IdIntegracao = idIntegracao;
        this.HeaderPlugBoleto = headerPlugBoleto;
        this.Banco = banco;
    }
}
import { BancoRepository } from "../repositories/BancoRepository";

export class BancoSeed {
    private bancoRepository = new BancoRepository();

    async Seed() {
        await this.bancoRepository.deleteAll();

        await this.InserirDadosCedente("001", "Banco do Brasil", process.env.BANCO_DO_BRASIL_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("104", "Caixa", process.env.CAIXA_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("341", "Itau", process.env.ITAU_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("756", "Sicoob", process.env.SICOOB_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("748", "Sicredi", process.env.SICREDI_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("033", "Santander", process.env.SANTANDER_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("041", "Banrisul", process.env.BANRISUL_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
        await this.InserirDadosCedente("077", "Inter", process.env.INTER_CEDENTECNPJ_CONTA_DV_CONVENIO_IDINTEGRACAO);
    }

    async InserirDadosCedente(codigo: String, nomeBanco: String, parametroBanco: String | undefined) {
        const { cedente, conta, contaDv, convenio, idIntegracao } = this.obterDados(parametroBanco);

        if (cedente == "" || conta == "" || contaDv == "" || convenio == "" || idIntegracao == "")
            return;

        await this.bancoRepository.create(codigo, nomeBanco, cedente, conta, contaDv, convenio, idIntegracao);
    }

    obterDados(parametroBanco: String | undefined) {
        var dados = (parametroBanco || "").split("--");

        if (dados.length < 4)
            dados = ["", "", "", "", ""];

        return {
            cedente: dados[0],
            conta: dados[1],
            contaDv: dados[2],
            convenio: dados[3],
            idIntegracao: dados[4]
        };
    }
}
import { BancoEnum } from "../enums/bancoEnum";
import { DadosRequestBoletoModel } from "../models/DadosRequestBoletoModel";
import { BancoRepository } from "../repositories/BancoRepository";
import { ErrorMessageUtils } from "../utils/ErrorMessageUtils";


export class BoletoRequestFactory {
    private bancoRepository = new BancoRepository();
    private tokenPlugBoleto = process.env.TOKEN_PLUGBOLETO || "";
    private cnpjPlugBoleto = process.env.CNPJ_PLUGBOLETO || "";

    async ObterDadosRequestBoletoModel(banco: BancoEnum) {
        var bancoEntity = await this.bancoRepository.getByCodigo(banco);

        // if (bancoEntity == null)
        //     throw new Error(ErrorMessageUtils.EnvNaoConfigurado);

        if (bancoEntity == null) return null;

        return new DadosRequestBoletoModel({
            CedenteContaNumero: bancoEntity.CedenteContaNumero,
            CedenteContaNumeroDV: bancoEntity.CedenteContaDv,
            CedenteConvenioNumero: bancoEntity.CedenteConvenioNumero,
            CedenteContaCodigoBanco: "001",
            SacadoCPFCNPJ: "08357906000170",
            SacadoEnderecoNumero: "987",
            SacadoEnderecoBairro: "Centro",
            SacadoEnderecoCEP: "87045430",
            SacadoEnderecoCidade: "Maringá",
            SacadoEnderecocomplemento: "Fundos",
            SacadoEnderecoLogradouro: "Rua teste, 987",
            SacadoEnderecoPais: "Brasil",
            SacadoEnderecoUF: "PR",
            SacadoNome: "FooBarTeste",
            sacadoTelefone: "4499999999",
            SacadoCelular: true,
            TituloDataEmissao: "22/04/2019",
            TituloDataVencimento: "24/04/2019",
            TituloMensagem01: "Teste",
            TituloMensagem02: "Nao receber apos 30 dias de atraso",
            TituloMensagem03: " sujito a protesto apos 30 dias",
            TituloNumeroDocumento: "321",
            TituloDocEspecie: "01",
            TituloNossoNumero: Math.floor(Math.random() * 1000),
            Titulovalor: "0,10",
            titulosacadoravalistaenderecoNumero: "155",
            TituloLocalPagamento: "Pagável em qualquer banco até o vencimento.",
            TituloSacadorAvalistaBairro: "JDestes"
        }, {
            CnpjCedente: bancoEntity.CnpjCedente,
            TokenSh: this.tokenPlugBoleto,
            CnpjSh: this.cnpjPlugBoleto
        },
            bancoEntity.IdIntegracao,
            {
                Codigo: bancoEntity.Codigo,
                Nome: bancoEntity.Nome
            });
    }
}
export interface ResultInclusaoBoletoModel {
    _status: string,
    _mensagem: string,
    _dados: ResultDadosPlugBoleto
}

export interface ResultDadosPlugBoleto {
    _sucesso: any[]
    _falha: Falha[]
}

export interface Falha {
    _status_http: number
    _erro: ErroBoleto
    _dados: DadosBoleto
}

export interface ErroBoleto {
    erroValidacao: boolean
    erros: object
}

export interface DadosBoleto {
    idintegracao: string
    situacao: string
    TituloNumeroDocumento: string
    TituloNossoNumero: string
    CedenteContaCodigoBanco: string
    CedenteContaNumero: string
    CedenteConvenioNumero: string
    SacadoCPFCNPJ: string
    SacadoEmail: string
    SacadoEnderecoNumero: string
    SacadoEnderecoBairro: string
    SacadoEnderecoCEP: string
    SacadoEnderecoCidade: string
    SacadoEnderecoComplemento: string
    SacadoEnderecoLogradouro: string
    SacadoEnderecoPais: string
    SacadoEnderecoUF: string
    SacadoNome: string
    SacadoTelefone: string
    SacadoCelular: string
    TituloDataDesconto: any
    TituloValorDesconto: string
    TituloDataEmissao: string
    TituloDataVencimento: string
    TituloValorJuros: string
    TituloPrazoProtesto: any
    TituloMensagem01: string
    TituloMensagem02: string
    TituloMensagem03: string
    TituloMensagem04: any
    TituloMensagem05: any
    TituloMensagem06: any
    TituloMensagem07: any
    TituloMensagem08: any
    TituloMensagem09: any
    TituloInstrucao1: string
    TituloInstrucao2: any
    TituloInstrucao3: any
    TituloInstrucaoPrazo1: string
    TituloInstrucaoPrazo2: any
    TituloInstrucaoPrazo3: any
    TituloValor: string
    TituloEmissaoBoleto: any
    TituloPostagemBoleto: any
    TituloLocalPagamento: string
    TituloCodigoReferencia: any
    TituloTipoCobranca: any
}

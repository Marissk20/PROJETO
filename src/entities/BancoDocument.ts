export interface IBanco extends Document {
    Codigo: String;
    Nome: string;
    CnpjCedente: string;
    CedenteContaNumero: string;
    CedenteContaDv: string;
    CedenteConvenioNumero: string;
    IdIntegracao: string;
}
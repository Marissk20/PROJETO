import { TipoConsulta } from "../enums/TipoConsultaEnum";

export interface IMonitoramento extends Document {
    CodigoBanco: string;
    NomeBanco: string;
    Tipo: TipoConsulta;
    StatusCode: number;
    CriadoEm: Date;
    DuracaoRequisicao: number;
    PayloadResposta: String;
    Error: boolean;
}
import { TipoConsulta } from "../enums/TipoConsultaEnum";

export class DadosMonitoramentoQueryParams {
    DataInicial!: Date;
    DataFinal!: Date;
    Tipo!: TipoConsulta | null;
    CodigoBanco!: string;
}
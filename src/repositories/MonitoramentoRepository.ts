import { model, Schema } from "mongoose";
import { IMonitoramento } from "../entities/MonitoramentoDocument";


const monitoramentoSchema = new Schema({
    Codigo: { type: String, required: true },
    Nome: { type: String, required: true },
    Tipo: { type: Number, required: true },
    StatusCode: { type: Number, required: true },
    CriadoEm: { type: Date, required: true },
    DuracaoRequisicao: { type: Number, required: true },
    PayloadResposta: { type: String, required: true },
    Error: { type: Boolean }
});

export class MonitoramentoRepository {
    private monitoramentoEntity = model<IMonitoramento>('Monitoramento', monitoramentoSchema);

    async create(codigo: String, nome: String, tipo: number, statusCode: Number, duracaoRequisicao: number, payloadResposta: String, error: boolean) {
        const newMonitoramento = new this.monitoramentoEntity({ Codigo: codigo, Nome: nome, Tipo: tipo, StatusCode: statusCode, CriadoEm: Date.now(), DuracaoRequisicao: duracaoRequisicao, PayloadResposta: payloadResposta, Error: error });
        return newMonitoramento.save();
    }

    async getAllInPeriod(inicio: Date, fim: Date): Promise<IMonitoramento[] | null> {
        return await this.monitoramentoEntity.find({
            CriadoEm: { $gte: inicio, $lte: fim }
        }).exec();
    }

    async getByFilter(filter: any) {
        return await this.monitoramentoEntity.find(filter).exec();
    }
}
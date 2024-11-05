import { model, Schema } from "mongoose";
import { IBanco } from "../entities/BancoDocument";

const bancoSchema: Schema = new Schema({
    Codigo: { type: String, required: true, unique: true },
    Nome: { type: String, required: true, unique: true },
    CnpjCedente: { type: String, required: true },
    CedenteContaNumero: { type: String, required: true },
    CedenteContaDv: { type: String, required: true },
    CedenteConvenioNumero: { type: String, required: true  },
    IdIntegracao: { type: String, required: true, unique: true }
});

export class BancoRepository {
    private bancoEntity = model<IBanco>('Banco', bancoSchema);

    async create(codigo: String, nome: String, cnpjCedente: String, cedenteContaNumero: String, cedenteContaDv: String, cedenteConvenioNumero: String, idIntegracao: String): Promise<IBanco> {
        const newBanco = new this.bancoEntity({ Codigo: codigo, Nome: nome, CnpjCedente: cnpjCedente, CedenteContaNumero: cedenteContaNumero, CedenteContaDv: cedenteContaDv, CedenteConvenioNumero: cedenteConvenioNumero, IdIntegracao: idIntegracao });
        return newBanco.save();
    }

    async getAll(): Promise<IBanco[]> {
        return this.bancoEntity.find().exec();
    }

    async getByCodigo(codigo: String): Promise<IBanco | null> {
        return this.bancoEntity.findOne({ Codigo: codigo }).exec();
    }

    async deleteAll(): Promise<void> {
        this.bancoEntity.deleteMany({}).exec();
        this.bancoEntity.collection.drop();
    }
}
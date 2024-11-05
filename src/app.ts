import express, { Application } from 'express';
import mongoose from 'mongoose';
import { BancoSeed } from './seeds/BancoSeed';
import { ErrorMessageUtils } from './utils/ErrorMessageUtils';
import { MonitoramentoService } from './services/MonitoramentoService';
import DadosMonitoramentoRoutes from './routes/DadosMonitoramentoRoutes';

const app: Application = express();
const mongoDb = process.env.MONGODB || "";
const port = process.env.PORT || 3000;
const cincoMinutos = 300000;
const trintaSegundos = 30000;

app.use(express.json());

app.use('/api', DadosMonitoramentoRoutes);

if (mongoDb == "") {
    throw new Error(ErrorMessageUtils.EnvNaoConfigurado);
}

mongoose.connect(mongoDb)
    .then(async () => {
        console.log('Conectado ao MongoDB');

        await new BancoSeed().Seed();

        console.log("Dados iniciais de banco inseridos/atualizados");

        app.listen(port, async () => {
            console.log(`Servidor rodando na porta ${port}`);
            //setInterval(IniciarJobMonitoramento, cincoMinutos);
            setInterval(await IniciarJobMonitoramento, trintaSegundos);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

const IniciarJobMonitoramento = async () => {
    await new MonitoramentoService().IniciarMonitoramento();
}
import App from './app';

App.app.listen(5000, () => console.log('Servidor está rodando na porta 5000'));

process.once('SIGUSR2', () => App.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => App.closeDataBaseConnection('execução interrompida', () => process.exit(0)));

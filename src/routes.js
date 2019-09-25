import { Router } from 'express';
import AtendimentoController from './app/controllers/AtendimentoController';

const routes = new Router();

routes.get('/atendimento', AtendimentoController.index);
routes.get('/atendimento/:id', AtendimentoController.indexId);
routes.post('/atendimento', AtendimentoController.store);
routes.post('/atendimento/:id', AtendimentoController.update);

export default routes;

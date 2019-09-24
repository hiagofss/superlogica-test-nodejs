import { Router } from 'express';
import AtendimentoController from './app/controllers/AtendimentoController';

const routes = new Router();

routes.get('/atendimento', AtendimentoController.index);
routes.post('/atendimento', AtendimentoController.store);
routes.put('/atendimento/:id', AtendimentoController.update);

export default routes;

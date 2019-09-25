import Atendimento from '../models/Atendimento';
import Mail from '../../lib/Mail';

class AtendimentoController {
  async index(req, res) {
    const atendimentos = await Atendimento.findAll();

    return res.json(atendimentos);
  }

  async indexId(req, res) {
    const atendimento = await Atendimento.findOne({
      where: { id: req.params.id },
    });

    return res.json(atendimento);
  }

  async store(req, res) {
    const { cpf, email, mensagem } = req.body;
    const status = 'Pendente';
    const atendimento = await Atendimento.create({
      cpf,
      email,
      mensagem,
      status,
    });
    await Mail.sendMail({
      to: `${email} <${email}>`,
      subject: `Status do atendimento: ${status}`,
      template: 'atendimento',
      context: {
        cpf,
        email,
        mensagem,
        status,
      },
    });

    return res.json(atendimento);
  }

  async update(req, res) {
    const { cpf, email, mensagem, status } = req.body;

    const atendimento = await Atendimento.update(
      {
        cpf,
        email,
        mensagem,
        status,
      },
      { where: { id: req.params.id } }
    );

    await Mail.sendMail({
      to: `${email} <${email}>`,
      subject: `Status do atendimento: ${status}`,
      template: 'atendimento',
      context: {
        cpf,
        email,
        mensagem,
        status,
      },
    });

    return res.json(atendimento);
  }
}

export default new AtendimentoController();

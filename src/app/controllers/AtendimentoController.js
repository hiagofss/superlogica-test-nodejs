import * as Yup from 'yup';
import Atendimento from '../models/Atendimento';
import Mail from '../../lib/Mail';

class AtendimentoController {
  async index(req, res) {
    const atendimentos = await Atendimento.findAll();

    return res.json(atendimentos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      email: Yup.string()
        .email()
        .required(),
      mensagem: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacao' });
    }

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
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      email: Yup.string()
        .email()
        .required(),
      mensagem: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacao' });
    }

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

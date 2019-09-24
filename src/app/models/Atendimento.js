import Sequelize, { Model } from 'sequelize';

class Atendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        mensagem: Sequelize.TEXT,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Atendimento;

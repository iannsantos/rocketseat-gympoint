import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class AnswerController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
        answer_at: null,
      },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { help_order_id } = req.params;

    const helpOrder = await HelpOrder.findByPk(help_order_id);

    if (!helpOrder) {
      return res.status(400).json({ error: "This help order doesn't exist" });
    }

    const { answer } = req.body;

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();

    await helpOrder.save();

    const student = await Student.findByPk(helpOrder.student_id);

    await Queue.add(AnswerMail.key, {
      student,
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();

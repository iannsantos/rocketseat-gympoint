import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, helpOrder } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'GymPoint - Pergunta respondida',
      template: 'answer',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(
          parseISO(helpOrder.answer_at),
          "dd 'de' MMMM 'às ' HH:mm:ss",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();

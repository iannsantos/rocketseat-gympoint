import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'UpdateRegistrationMail';
  }

  async handle({ data }) {
    const { registration, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'GymPoint - Atualização na matrícula',
      template: 'updateRegistration',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(parseISO(registration.end_date), "dd 'de' MMMM", {
          locale: pt,
        }),
        price: registration.price,
      },
    });
  }
}

export default new RegistrationMail();

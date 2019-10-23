import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findByPk(req.body.student_id);

    if (!student) {
      return res.status(400).json({ error: "This student doesn't exist" });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: "This plan doesn't exist" });
    }

    const { start_date } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      plan,
      end_date,
      price,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();

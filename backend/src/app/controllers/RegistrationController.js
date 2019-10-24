import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';
import UpdateRegistrationMail from '../jobs/UpdateRegistrationMail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });

    return res.json(registrations);
  }

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

    // check if user exist
    const student = await Student.findByPk(req.body.student_id);

    if (!student) {
      return res.status(400).json({ error: "This student doesn't exist" });
    }

    // check if plan exist
    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: "This plan doesn't exist" });
    }

    const { start_date } = req.body;

    // check if date already is past
    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: "Past dates aren't permitted" });
    }

    const registrationExist = await Registration.findOne({
      where: {
        student_id: student.id,
      },
    });

    if (registrationExist) {
      return res
        .status(400)
        .json({ error: 'This student already has a registration' });
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

  async update(req, res) {
    const registration = await Registration.findByPk(
      req.params.registration_id
    );

    // check if registration exist
    if (!registration) {
      return res.status(400).json({ error: "This registration doesn't exist" });
    }

    const { plan_id, start_date } = req.body;

    // check if plan_id exist in request body
    if (plan_id) {
      const plan = await Plan.findByPk(plan_id);

      // check if plan exist
      if (!plan) {
        return res.status(400).json({ error: "This plan doesn't exist" });
      }

      // update registration with new plan
      registration.plan_id = plan_id;
      registration.duration = plan.duration;
      registration.price = plan.duration * plan.price;
    }

    // check if start_date exist in request body and if date doesn't in past
    if (start_date && !isBefore(parseISO(start_date), new Date())) {
      registration.start_date = start_date;
    } else if (start_date && isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: "Past dates aren't permitted" });
    }

    // update end_date with new start_date
    registration.end_date = addMonths(
      registration.start_date,
      registration.duration
    );

    await registration.save();

    const student = await Student.findByPk(registration.student_id);
    const plan = await Plan.findByPk(registration.plan_id);

    await Queue.add(UpdateRegistrationMail.key, {
      registration,
      student,
      plan,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(
      req.params.registration_id
    );

    if (!registration) {
      return res.status(400).json({ error: "This plan doesn't exist" });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();

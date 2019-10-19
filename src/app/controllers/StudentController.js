import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    if (
      await Student.findOne({
        where: { email },
      })
    ) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID of student is required' });
    }

    if (email) {
      if (
        await Student.findOne({
          where: { email },
        })
      ) {
        return res.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    await Student.update(req.body, { where: { id } });

    const student = await Student.findOne({
      where: { id },
    });

    return res.json(student);
  }
}

export default new StudentController();

import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    let { title } = req.body;
    title = title.toUpperCase();

    // check if plan already exists
    const existsPlan = await Plan.findOne({
      where: { title },
    });

    if (existsPlan) {
      return res.status(400).json({ error: 'This plan already exists' });
    }

    const plan = await Plan.create({
      title,
      price: req.body.price,
      duration: req.body.duration,
    });

    return res.json(plan);
  }
}

export default new PlanController();

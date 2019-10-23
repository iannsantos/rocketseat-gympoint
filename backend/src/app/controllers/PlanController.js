import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'price', 'duration'],
      order: ['createdAt'],
    });

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

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "This plan doesn't exist" });
    }

    let { title } = req.body;
    title = title.toUpperCase();

    // check if title already in use
    if (title && title !== plan.title) {
      const titleExist = await Plan.findOne({
        where: { title },
      });

      if (titleExist) {
        return res.status(400).json({ error: 'This title is already in use' });
      }
    }

    const { id, duration, price } = await plan.update(
      {
        title,
        duration: req.body.duration,
        price: req.body.price,
      },
      {
        where: { id: plan.id },
      }
    );

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "This plan doesn't exist" });
    }

    await Plan.destroy({ where: { id: plan.id } });

    return res.send();
  }
}

export default new PlanController();

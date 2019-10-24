import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    // check if student exist
    if (!student) {
      return res.status(400).json({ error: "This student doesn't exist" });
    }

    const { count } = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    // check if student has already done 5 checkins this week
    if (count >= 5) {
      return res
        .status(400)
        .json({ error: 'This student has already done 5 checkins this week' });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();

import * as Yup from 'yup';
import Patient from '../models/Patient';

class PatientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      gender: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    
    const patientExists = await Patient.findOne({
      where: { email: req.body.email },
    });
    
    if (patientExists) {
      return res.status(400).json({ error: 'Paciente já existe.' });
    }
    
    const { id, name, email, age, gender } = await Patient.create(
      req.body
    );
    
    return res.json({
      id,
      name,
      email,
      age,
      gender,
    });
  }

  async update(req, res) {
    const { userId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      gender: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const patient = await Patient.findByPk(userId);

    if (!patient) {
      return res.status(400).json({ error: 'User do not found' });
    }

    const { id, name, email, age, gender } = await patient.update(
      req.body
    );

    return res.json({ id, name, email, age, gender });
  }
  
  async index(req, res) {
    const patients = await Patient.findAll({
      attributes: ['id', 'name', 'email', 'age', 'gender'],
    });

    return res.json(patients);
  }
}

export default new PatientController();
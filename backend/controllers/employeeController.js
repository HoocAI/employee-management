const Employee = require('../models/Employee');
const Joi = require('joi');

const addEmployee = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      department: Joi.string().required(),
      skills: Joi.array().items(Joi.string()).required(),
      performanceScore: Joi.number().min(0).max(100).required(),
      experience: Joi.number().min(0).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, department, skills, performanceScore, experience } = req.body;

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) {
      query.department = { $regex: new RegExp(department, 'i') };
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addEmployee, getEmployees, searchEmployees };

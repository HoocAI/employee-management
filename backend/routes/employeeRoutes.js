const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, searchEmployees } = require('../controllers/employeeController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addEmployee);
router.get('/search', protect, searchEmployees);
router.get('/', protect, getEmployees);

module.exports = router;

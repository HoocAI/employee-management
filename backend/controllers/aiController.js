const recommendAI = async (req, res) => {
  try {
    const { employees } = req.body;
    
    if (!employees || !Array.isArray(employees) || employees.length === 0) {
      return res.status(400).json({ message: 'Employees array is required for AI recommendation' });
    }

    // MOCK AI LOGIC FOR EXAM
    const promotions = [];
    const rankings = [];
    const training = [];
    const feedback = [];

    // Sort employees by performance score descending for rankings
    const sortedEmployees = [...employees].sort((a, b) => b.performanceScore - a.performanceScore);
    sortedEmployees.forEach((emp, index) => {
      rankings.push(`${index + 1}. ${emp.name} (Score: ${emp.performanceScore})`);
      
      if (emp.performanceScore >= 85) {
        promotions.push(`${emp.name} is highly recommended for promotion due to outstanding performance score of ${emp.performanceScore}.`);
      }
      
      if (emp.performanceScore < 70) {
        feedback.push(`${emp.name} needs to improve performance. Current score is ${emp.performanceScore}. Consider setting clearer KPIs.`);
      }

      if (!emp.skills || emp.skills.length < 3) {
        training.push(`${emp.name} should enroll in upskilling courses to broaden technical stack.`);
      }
    });

    // Add a generic training suggestion if none matched
    if (training.length === 0) {
      training.push('All evaluated employees are well-equipped, but continuous learning is encouraged.');
    }

    // Add a simulated delay of 1.5 seconds to mimic an AI API call
    setTimeout(() => {
      res.json({
        promotions,
        rankings,
        training,
        feedback
      });
    }, 1500);
    
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Error generating AI recommendations', error: error.message });
  }
};

module.exports = { recommendAI };

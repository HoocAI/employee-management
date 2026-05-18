const OpenAI = require('openai');

const recommendAI = async (req, res) => {
  try {
    const { employees } = req.body;
    
    if (!employees || !Array.isArray(employees) || employees.length === 0) {
      return res.status(400).json({ message: 'Employees array is required for AI recommendation' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENROUTER_BASE_URL || 'https://api.openai.com/v1',
    });

    const prompt = `
    Analyze the following employees and provide:
    1. Promotion Recommendations (for high performance score >= 85).
    2. Employee Rankings (if multiple).
    3. Training Suggestions (based on missing skills or lower scores).
    4. Feedback Generation (improvement feedback for lower scores < 70).
    
    Employees data:
    ${JSON.stringify(employees, null, 2)}
    
    Return the response as a structured JSON object with keys: 
    - "promotions": [array of employee names and reasons],
    - "rankings": [ordered list of employee names],
    - "training": [array of suggestions],
    - "feedback": [array of employee specific feedback]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Default placeholder model, works for OpenAI and OpenRouter if routed. For OpenRouter, "openai/gpt-3.5-turbo" might be needed, but let's stick to gpt-3.5-turbo.
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const aiOutput = JSON.parse(completion.choices[0].message.content);
    res.json(aiOutput);
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Error generating AI recommendations', error: error.message });
  }
};

module.exports = { recommendAI };

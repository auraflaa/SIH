// This is the entire code for your secure backend proxy server.
// It includes CORS headers to allow your frontend website to connect to it.

export default async function handler(request, response) {
  // --- CORS Headers ---
  // These headers give permission to your website to call this backend.
  response.setHeader('Access-Control-Allow-Origin', '*'); // Allows any origin
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (the browser sends this before the actual POST)
  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }
  
  // We only accept POST requests from our website.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  // Securely get the API key from the server's environment variables.
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return response.status(500).json({ message: 'API key is not configured on the server.' });
  }

  // Prepare the request to be forwarded to the real Google Gemini API.
  const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
  
  const systemPrompt = "You are an expert career counselor for students in Jammu & Kashmir. Your tone is encouraging and helpful. You have access to the app's data on colleges, exams, and career paths. Keep your answers concise and focused on the user's question. Use markdown for bolding important terms, and use bullet points for lists where appropriate.";

  try {
    // Forward the user's prompt and our system instructions to Google.
    const googleApiResponse = await fetch(googleApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: request.body.contents,
      }),
    });

    const data = await googleApiResponse.json();

    if (!googleApiResponse.ok) {
      console.error('Google API Error:', data);
      return response.status(googleApiResponse.status).json(data);
    }
    
    // Send the final response from Google back to our website.
    return response.status(200).json(data);

  } catch (error) {
    console.error('Error in proxy function:', error);
    return response.status(500).json({ message: 'An internal server error occurred.' });
  }
}


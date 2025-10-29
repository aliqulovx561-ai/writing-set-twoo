export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method === 'POST') {
    try {
      const { message } = request.body;

      if (!message) {
        return response.status(400).json({
          success: false,
          error: 'Message is required'
        });
      }

      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return response.status(500).json({
          success: false,
          error: 'Telegram configuration missing'
        });
      }

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const result = await telegramResponse.json();

      if (result.ok) {
        return response.status(200).json({
          success: true,
          message: 'Test submitted successfully'
        });
      } else {
        return response.status(500).json({
          success: false,
          error: result.description || 'Failed to send message'
        });
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message
      });
    }
  } else {
    return response.status(405).json({
      error: 'Method not allowed'
    });
  }
}

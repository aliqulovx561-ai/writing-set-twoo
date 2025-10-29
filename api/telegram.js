export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { message, botToken, chatId } = request.body;

    // Validate required parameters
    if (!message || !botToken || !chatId) {
      return response.status(400).json({
        error: 'Missing required parameters: message, botToken, or chatId'
      });
    }

    try {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      
      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const result = await telegramResponse.json();

      if (result.ok) {
        return response.status(200).json({
          success: true,
          message: 'Telegram message sent successfully'
        });
      } else {
        return response.status(500).json({
          success: false,
          error: result.description || 'Telegram API error'
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

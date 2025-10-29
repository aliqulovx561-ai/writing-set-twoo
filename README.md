# IELTS Writing Test - Set Two

A secure online IELTS Writing Test platform with anti-cheating features.

## Features

- **Secure Testing Environment**: Anti-cheating measures including tab switching detection
- **Real-time Monitoring**: Typing speed analysis and violation tracking
- **Automated Submission**: PDF generation and Telegram integration
- **Time Management**: 60-minute countdown timer with warnings
- **Teacher Assignment**: Support for multiple teachers

## Setup Instructions

### Telegram Bot Configuration

1. Create a Telegram bot using [@BotFather](https://t.me/BotFather)
2. Get your bot token
3. Get your chat ID (you can use @userinfobot)
4. Update the Telegram credentials in `index.html`:
   ```javascript
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
   const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

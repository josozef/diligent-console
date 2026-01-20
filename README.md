# Diligent Console - AI Assistant

A professional, minimalist Hero-style AI web application designed for board governance and administrative tasks.

## Features

### Welcome Message
- Personalized greeting for the user
- Clean, professional typography

### Quick Action Buttons
1. **Critical Notifications** - Shows count of critical items requiring attention
2. **Updated Chats** - Displays number of chats with recent activity
3. **Appoint a Director** - Quick access to director appointment workflow
4. **Open Application** - Access to recent applications and forms

### AI Prompt Interface
- Gemini-style prompt box with auto-expanding textarea
- Send button with smooth animations
- Suggestion chips for common actions
- Response area with formatted output

## Design

- **Theme**: Light, professional, minimalist
- **Color Scheme**: Blues, grays, and white for a corporate feel
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Interactions**: Smooth animations and hover effects

## Usage

Simply open `index.html` in a web browser. No build process or dependencies required.

### Quick Actions
Click any of the four action buttons to auto-populate the prompt with relevant queries.

### AI Prompt
Type your question or request in the prompt box and press Enter (or click the send button) to get a response.

### Suggestion Chips
Click any suggestion chip to quickly execute common tasks.

## Customization

- Update user name in `index.html` (line 14)
- Adjust notification counts in the HTML
- Modify color scheme in `styles.css`
- Connect to actual AI API in `script.js` (replace mock responses)

## Future Enhancements

- Connect to real AI backend (OpenAI, Google Gemini, etc.)
- Add authentication and user management
- Implement real-time notifications
- Add chat history and conversation persistence
- Integrate with document management systems

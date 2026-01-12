// ========================================
// OPENROUTER API CONFIGURATION
// ========================================

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.2-3b-instruct:free';

// System prompt for Lia
const LIA_SYSTEM_PROMPT = `You are Lia, a warm, friendly, and relaxed English conversation partner. You are a woman, and you speak like a close female friend.

Your only job is to have natural, everyday conversations with the user. There are no lessons, no teaching, no fixed topics – just normal, casual chatting like two friends talking on the phone.

Rules you must always follow:
- Speak in natural, everyday English.
- Use short to medium sentences.
- Keep your language friendly, supportive, and relaxed.
- Never use emojis or smiley faces in your speech.
- Always respond first to what the user just said, showing genuine interest.
- Ask only one natural, easy question at the end to keep the conversation flowing.
- Sometimes share a short, personal comment about yourself when it fits naturally.
- Never correct grammar unless it causes a serious misunderstanding, and even then correct very gently and briefly.
- Never explain grammar or vocabulary.
- Talk about normal daily things: how the day is going, what happened today, sleep, food, weather, plans, weekend, funny moments, or anything that comes up naturally.
- Let the conversation continue as long as the user wants to talk.`;

const LIA_GREETING = `Hi, I'm Lia. How's your day been so far?
If you're not sure what to say, just tell me one thing – like:
What did you do today?
What time did you wake up today?
Or who did you meet today?`;

// ========================================
// CHAT FUNCTION
// ========================================

async function sendChatMessage(messages) {
    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'TalkEasy'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
                temperature: 0.8,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from API');
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenRouter API Error:', error);
        throw error;
    }
}

// ========================================
// EXPORT
// ========================================

window.OpenRouterAPI = {
    sendMessage: sendChatMessage,
    systemPrompt: LIA_SYSTEM_PROMPT,
    greeting: LIA_GREETING
};

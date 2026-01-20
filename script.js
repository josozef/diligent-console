// Auto-resize textarea
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');
const responseContent = document.getElementById('responseContent');

// Quick action buttons
const criticalBtn = document.getElementById('criticalBtn');
const chatsBtn = document.getElementById('chatsBtn');
const appointBtn = document.getElementById('appointBtn');
const openAppBtn = document.getElementById('openAppBtn');

// Auto-resize textarea as user types
promptInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Handle Enter key (Shift+Enter for new line)
promptInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send button click
sendBtn.addEventListener('click', sendMessage);

// Suggestion chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', function() {
        promptInput.value = this.textContent;
        promptInput.focus();
        sendMessage();
    });
});

// Quick action button handlers
criticalBtn.addEventListener('click', function() {
    const count = document.getElementById('criticalCount').textContent;
    setPromptAndSend(`Show me the ${count} critical notifications that need my attention.`);
});

chatsBtn.addEventListener('click', function() {
    const count = document.getElementById('chatsCount').textContent;
    setPromptAndSend(`Show me the ${count} updated chats with recent activity.`);
});

appointBtn.addEventListener('click', function() {
    setPromptAndSend('I need to appoint a new director. What is the process and what documents do I need?');
});

openAppBtn.addEventListener('click', function() {
    setPromptAndSend('I need to open an application. Show me my recent applications or help me start a new one.');
});

// Helper function to set prompt and send
function setPromptAndSend(message) {
    promptInput.value = message;
    sendMessage();
}

// Send message function
function sendMessage() {
    const message = promptInput.value.trim();
    
    if (!message) return;
    
    // Show loading state
    responseArea.style.display = 'block';
    responseContent.innerHTML = '<div class="loading">Processing your request...</div>';
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
        const response = generateResponse(message);
        responseContent.innerHTML = response;
        
        // Add loading animation style
        const style = document.createElement('style');
        style.textContent = `
            .loading {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #64748b;
                font-style: italic;
            }
            .loading::after {
                content: '';
                width: 20px;
                height: 20px;
                border: 2px solid #e2e8f0;
                border-top-color: #3b82f6;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }, 800);
    
    // Clear input
    promptInput.value = '';
    promptInput.style.height = 'auto';
}

// Generate mock response based on message
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('critical notification')) {
        return `
            <h3 style="margin-bottom: 12px; color: #1a1a1a;">Critical Notifications (3)</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="padding: 12px; background: #fef2f2; border-left: 3px solid #ef4444; border-radius: 6px;">
                    <strong>Board Meeting Approval Required</strong>
                    <p style="margin-top: 4px; color: #64748b; font-size: 0.9rem;">Q4 Financial report needs approval before January 25th</p>
                </div>
                <div style="padding: 12px; background: #fef2f2; border-left: 3px solid #ef4444; border-radius: 6px;">
                    <strong>Compliance Deadline Approaching</strong>
                    <p style="margin-top: 4px; color: #64748b; font-size: 0.9rem;">Annual compliance filing due in 5 days</p>
                </div>
                <div style="padding: 12px; background: #fef2f2; border-left: 3px solid #ef4444; border-radius: 6px;">
                    <strong>Director Signature Needed</strong>
                    <p style="margin-top: 4px; color: #64748b; font-size: 0.9rem;">3 documents awaiting your signature</p>
                </div>
            </div>
        `;
    } else if (lowerMessage.includes('updated chat')) {
        return `
            <h3 style="margin-bottom: 12px; color: #1a1a1a;">Updated Chats (7)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 10px; background: #f8fafc; border-radius: 6px;">
                    <strong>Board Members Group</strong> <span style="color: #64748b; font-size: 0.85rem;">• 12 new messages</span>
                </div>
                <div style="padding: 10px; background: #f8fafc; border-radius: 6px;">
                    <strong>Legal Team</strong> <span style="color: #64748b; font-size: 0.85rem;">• 5 new messages</span>
                </div>
                <div style="padding: 10px; background: #f8fafc; border-radius: 6px;">
                    <strong>Finance Committee</strong> <span style="color: #64748b; font-size: 0.85rem;">• 3 new messages</span>
                </div>
                <div style="padding: 10px; background: #f8fafc; border-radius: 6px;">
                    <strong>Audit Team</strong> <span style="color: #64748b; font-size: 0.85rem;">• 2 new messages</span>
                </div>
            </div>
        `;
    } else if (lowerMessage.includes('appoint') && lowerMessage.includes('director')) {
        return `
            <h3 style="margin-bottom: 12px; color: #1a1a1a;">Appointing a Director</h3>
            <p style="margin-bottom: 16px; line-height: 1.6;">Here's what you need to appoint a new director:</p>
            <ol style="padding-left: 20px; line-height: 1.8;">
                <li><strong>Board Resolution:</strong> Draft and approve a board resolution for the appointment</li>
                <li><strong>Consent to Act:</strong> Obtain signed consent from the director candidate</li>
                <li><strong>Conflict of Interest Declaration:</strong> Complete the COI form</li>
                <li><strong>Identity Verification:</strong> Provide government-issued ID and proof of address</li>
                <li><strong>File with Registry:</strong> Submit forms to the corporate registry within 15 days</li>
            </ol>
            <p style="margin-top: 16px; padding: 12px; background: #eff6ff; border-radius: 6px; color: #1e40af;">
                💡 I can help you prepare these documents. Would you like to start the process?
            </p>
        `;
    } else if (lowerMessage.includes('open') && lowerMessage.includes('application')) {
        return `
            <h3 style="margin-bottom: 12px; color: #1a1a1a;">Recent Applications</h3>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                <div style="padding: 12px; background: #f8fafc; border-radius: 6px; cursor: pointer;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8fafc'">
                    <strong>Director Appointment - John Smith</strong>
                    <p style="margin-top: 4px; color: #64748b; font-size: 0.9rem;">Status: In Progress • Updated 2 days ago</p>
                </div>
                <div style="padding: 12px; background: #f8fafc; border-radius: 6px; cursor: pointer;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8fafc'">
                    <strong>Annual Return Filing 2025</strong>
                    <p style="margin-top: 4px; color: #64748b; font-size: 0.9rem;">Status: Pending Review • Updated 1 week ago</p>
                </div>
            </div>
            <button style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
                + Start New Application
            </button>
        `;
    } else {
        return `
            <p>I understand you're asking about: "<em>${message}</em>"</p>
            <p style="margin-top: 12px; line-height: 1.6;">
                I'm here to help you with board governance, compliance, document management, and administrative tasks. 
                You can ask me about critical notifications, chat updates, director appointments, applications, or any other governance matters.
            </p>
            <p style="margin-top: 12px; padding: 12px; background: #f8fafc; border-radius: 6px; color: #475569;">
                💡 Try clicking one of the quick action buttons above, or ask me something specific about your board or organization.
            </p>
        `;
    }
}

// Add some visual feedback on button clicks
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

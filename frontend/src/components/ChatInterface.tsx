import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, User, Bot, Sparkles } from 'lucide-react';

// Message Component with Markdown Support
const Message = ({ message, isStreaming }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  const parts = renderContent(message.content);

  return (
    <div className={`flex gap-4 p-6 ${message.role === 'assistant' ? 'bg-zinc-900/50' : ''}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          message.role === 'assistant' ? 'bg-blue-600' : 'bg-zinc-700'
        }`}>
          {message.role === 'assistant' ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden">
        {parts.map((part, idx) => (
          part.type === 'code' ? (
            <div key={idx} className="relative group">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(part.content)}
                  className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-300" />
                  )}
                </button>
              </div>
              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                <div className="text-xs text-zinc-500 mb-2">{part.language}</div>
                <pre className="text-sm text-zinc-200">
                  <code>{part.content}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div key={idx} className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {part.content}
            </div>
          )
        ))}
        {isStreaming && (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        )}
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo with hover effect */}
        <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-300">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
          AI Assistant
          </span>
        </div>

        {/* Center Title
        <h1 className="text-lg font-semibold text-white tracking-wide">
          AI Assistant
        </h1> */}

        {/* Get Started Button */}
        <button className="px-4 py-2 text-sm font-medium rounded-xl bg-white text-black border-none shadow-none transition-transform duration-200 hover:scale-105 focus:bg-white hover:bg-white active:bg-white">
          Get Started
        </button>
      </div>
    </header>
  );
};

// Main Chat Interface
export default function ChatInterface() {
  const [messages, setMessages] = useState([]); // Start with empty messages
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = async (text) => {
    setIsStreaming(true);
    let streamedContent = '';
    for (let i = 0; i < text.length; i++) {
      streamedContent += text[i];
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: streamedContent
        };
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, Math.random() * 20 + 10));
    }
    setIsStreaming(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    setIsStreaming(true);

    try {
      const response = await fetch('https://askme-2984.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentInput }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      await simulateStreaming(data.answer);
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: '❌ Sorry, there was an error connecting to the server. Please make sure the FastAPI backend is running.'
        };
        return newMessages;
      });
      setIsStreaming(false);
    }
  };

  const showWelcomeScreen = messages.length === 0;

  return (
    <div className="flex h-screen bg-black text-zinc-200 flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Chat or Welcome Screen */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="max-w-4xl mx-auto flex-1 w-full flex flex-col justify-between">
          {showWelcomeScreen ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
              <h1 className="text-3xl font-semibold text-white mb-3">
                Where should we begin?
              </h1>
              <p className="text-zinc-400 text-sm max-w-md">
                Ask me anything — from explaining AI concepts to generating code, or even brainstorming your next big idea.
              </p>
            </div>
          ) : (
            <div>
              {messages.map((message, index) => (
                <Message 
                  key={index} 
                  message={message}
                  isStreaming={isStreaming && index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Send a message..."
              disabled={isStreaming}
              className="w-full px-4 py-4 pr-12 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-zinc-200 placeholder-zinc-500"
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isStreaming}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500 text-center">
            Press Enter to send. AI assistant can make mistakes.
          </div>
        </div>
      </div>
    </div>
  );
}

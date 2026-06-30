"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "./providers";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const QUICK_QUESTIONS_VI = [
  "Cabin rộng bao nhiêu lít?",
  "Cửa vào cao bao nhiêu cm?",
  "Cảm biến an toàn hoạt động thế nào?",
  "Chính sách bảo hành và giá bán?"
];

const QUICK_QUESTIONS_EN = [
  "How big is the cabin capacity?",
  "What is the entry height in cm?",
  "How do safety sensors work?",
  "Warranty policy and price?"
];

export function Chatbot() {
  const { lang, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: lang === "vi"
            ? "Xin chào! Tôi là Trợ lý ảo tư vấn máy dọn vệ sinh mèo UBPet C41. Bạn cần giải đáp thông tin gì về sản phẩm?"
            : "Hello! I am your AI assistant for the UBPet C41. How can I help you with product information today?"
        }
      ]);
    }
  }, [lang, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      
      setIsTyping(false);
      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (e) {
      setIsTyping(false);
      const errorMsg = lang === "vi"
        ? "Xin lỗi, hệ thống AI đang bận. Vui lòng thử lại sau."
        : "Sorry, the AI system is busy right now. Please try again later.";
      setMessages((prev) => [...prev, { sender: "bot", text: errorMsg }]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const suggestions = lang === "vi" ? QUICK_QUESTIONS_VI : QUICK_QUESTIONS_EN;

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`chatbot-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat assistant"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <header className="chatbot-header">
            <div className="bot-avatar">🐱</div>
            <div className="bot-info">
              <h4>UBPet C41 Helper</h4>
              <p>Online AI Advisor</p>
            </div>
            <button 
              type="button" 
              className="chatbot-close-x" 
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.sender}-bubble`}>
                {msg.sender === "bot" && <div className="bubble-avatar">🤖</div>}
                <div className="bubble-text">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message-bubble bot-bubble">
                <div className="bubble-avatar">🤖</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="chatbot-suggestions">
            {suggestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-tag"
                onClick={() => handleSuggestionClick(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form className="chatbot-input-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder={lang === "vi" ? "Nhập câu hỏi tại đây..." : "Ask a question..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !inputValue.trim()}>
              🚀
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

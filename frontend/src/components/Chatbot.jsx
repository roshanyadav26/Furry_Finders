import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the Furry Finders Virtual Veterinarian. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('/api/chat', { message: input });
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: res.data.reply }
      ]);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Sorry, I am having trouble connecting to my brain right now!';
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: errorMessage }
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px',
            background: '#e6654a', borderRadius: '50%', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: 'white', fontSize: '24px', cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000
          }}
        >
          <i className="fa-solid fa-comments"></i>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '30px', right: '30px', width: '300px', height: '400px',
          background: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)', zIndex: 1000, overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ background: '#e6654a', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Virtual Veterinarian</h4>
            <i className="fa-solid fa-times" style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => setIsOpen(false)}></i>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '15px 10px', overflowY: 'auto', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? '#e6654a' : '#e0e0e0',
                color: msg.sender === 'user' ? 'white' : 'black',
                padding: '10px 15px', borderRadius: '15px', maxWidth: '80%', fontSize: '14px',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd', background: 'white', alignItems: 'center' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..." 
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: '#e6654a', cursor: 'pointer', fontSize: '20px', marginLeft: '10px' }}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

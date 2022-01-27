import React, { useState, useEffect } from 'react';
import './chat.css';
import io from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

const socket = io('http://localhost:3001');

const myId = uuidV4();

const Chat = () => {
     const [message, setMessage] = useState('');
     const [messages, setMessages] = useState([]);

     const handleInputChat = (event) => {
          setMessage(event.target.value);
     };

     useEffect(() => {
          console.log('entrei no useEffect');
          const handleNewMessage = (newMessage) =>
               setMessages([...messages, newMessage]);
          socket.on('chat.message', handleNewMessage);

          return () => socket.off('chat.message', handleNewMessage);
     }, [messages]);

     const handleFormSubmit = (event) => {
          event.preventDefault();
          if (message.trim()) {
               socket.emit('chat.message', {
                    id: myId,
                    message,
               });

               setMessage('');
          }
     };

     socket.on('connect', () => {
          console.log('[IO] Connect => A new connection');
     });

     return (
          <main className="container">
               <ul className="list">
                    {messages.map((m, index) => (
                         <li
                              className={`list__item  list__item--${
                                   m.id === myId ? 'mine' : 'other'
                              }`}
                              key={index}
                         >
                              <span
                                   className={`message message--${
                                        m.id === myId ? 'mine' : 'other'
                                   }`}
                              >
                                   {m.message}
                              </span>
                         </li>
                    ))}
               </ul>
               <form className="form" onSubmit={handleFormSubmit}>
                    <input
                         className="form__field"
                         placeholder="Type a new message here"
                         type="text"
                         value={message}
                         onChange={handleInputChat}
                    />
               </form>
          </main>
     );
};
// module.exports
export default Chat;

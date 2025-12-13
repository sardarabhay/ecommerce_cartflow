import { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'
function ChatMessages({chatMessages}){
        // const chatMessagesRef=React.useRef(null);

        // React.useEffect(()=>{
        //   const containerElem=chatMessagesRef.current;
        //   if(containerElem){
        //     containerElem.scrollTop=containerElem.scrollHeight;
        //   }
        // },[chatMessages]);
        function useAutoScroll(dependencies){
          const chatMessagesRef=useRef(null);

          useEffect(()=>{
            const containerElem=chatMessagesRef.current;
            if(containerElem){
              containerElem.scrollTop=containerElem.scrollHeight;
            }
          },[dependencies]);

          return chatMessagesRef;

        }

        const chatMessagesRef=useAutoScroll(chatMessages);

        
        
        return(
          <div 
          className="chat-messages-container"
          ref={chatMessagesRef}
          >
            {chatMessages.map((chatMessage)=>{
                return (
                  <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender} 
                  key={chatMessage.id}
                  time={chatMessage.time}
                />
              );
              })}
          </div>
        );      

      }

export default ChatMessages;
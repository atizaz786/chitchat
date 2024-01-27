// src/services/messageService.js
export const fetchMessages = async (senderId, recipientId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages?senderId=${senderId}&recipientId=${recipientId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    return [];
  };
  
import io from 'socket.io-client';

// export const socket = io('https://websocketserver-lge8.onrender.com/', {transports: ['websocket', 'polling', 'flashsocket']})
// export default socket
 
export const socket = io('http://localhost:8080');
// export const socket  = ()=>{
    
// }
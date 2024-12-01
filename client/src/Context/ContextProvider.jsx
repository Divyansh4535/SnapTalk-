import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("")
    const [socketId, setSocketId] = useState("");

    return (
        <UserContext.Provider value={{ message, setMessage, messages, setMessages, roomName, setRoomName, roomId, setRoomId, socketId, setSocketId }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider
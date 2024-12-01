import React, { useState, useRef, useContext } from "react";
import UserContext from "./Context/userContext";

export default function ChatBox({ socket }) {
    const textareaRef = useRef(null);
    const { message, setMessage, messages, setMessages, roomId, setRoomId, roomName, setRoomName, socketId, setSocketId } = useContext(UserContext)

    const handleInputChange = (e) => {
        const textarea = textareaRef.current;
        setMessage(e.target.value);
        // Reset the height to auto to calculate the new scrollHeight
        textarea.style.height = "auto";
        // Calculate the new height and set it, up to a maximum of 5 rows
        const maxHeight = 5 * 24; // Assuming line-height is 24px
        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("message", { roomId, message })
        setMessage("")
        setRoomId("")
    }
    const handleRoom = (e) => {
        e.preventDefault()
        socket.emit("join-room", roomName )
        setRoomName("")
    }
    return (
        <div className="w-full h-screen flex flex-col bg-gray-900">
            {/* Chat Area (Example) */}
            <h1 className="w-full h-10 text-center text-white text-lg  flex items-center justify-center ">Id :- {socketId}</h1>
            <div className="flex-1  bg-gray-800 overflow-y-auto p-4">
                {/* Example messages */}
                {/* <div className="rytMsg">Dk : hlo </div>
                <div className="lftMsg">Sumit : hy  </div> */}
                {messages.map((msg, idx) => (
                    <div className="rytMsg" key={idx}>{msg} </div>
                ))}

            </div>

            <form onSnSubmit={handleRoom} className="w-full h-auto bg-gray-900 flex items-end px-3 py-2">
                {/* Rooms  */}
                <textarea
                    ref={textareaRef}
                    className="px-3 py-2.5 flex-1 bg-gray-800 text-white rounded-lg  border-none focus:outline-none text-sm focus:ring-2 focus:ring-blue-400 resize-none  w-full  "
                    placeholder="Create Room Name "
                    rows={1}
                    style={{ lineHeight: "15px" }}
                    value={roomName}
                    name="roomName"
                    onChange={(e) => setRoomName(e.target.value)}
                ></textarea>

                {/* room id */}
                <div className=" ml-2 w-[100px] md:w-[300px] flex items-center justify-center ">
                    <textarea
                        ref={textareaRef}
                        className="px-3 py-2.5 flex-1 bg-gray-800 text-white rounded-lg  border-none focus:outline-none text-sm focus:ring-2 focus:ring-blue-400 resize-none  w-full  "
                        placeholder="Room Id"
                        rows={1}
                        style={{ lineHeight: "15px" }}
                        value={roomId}
                        name="roomId"
                        onChange={(e) => setRoomId(e.target.value)}
                    ></textarea>
                </div>
                {/* Send Button */}
                <button type="submit" className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                    Join Room
                </button>
            </form>

            {/* Input Field */}
            <form onSubmit={handleSubmit} className="w-full h-auto bg-gray-900 flex items-end px-3 py-2">
                {/* Emoji/Plus Button */}
                {/* <button className="text-gray-400 hover:text-gray-300 ">
                    😑
                </button> */}

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    className="flex-1 bg-gray-800 sm:w-[200px] text-white rounded-lg px-4 py-2 ml-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-y-auto"
                    placeholder="Type a message..."
                    rows={1}
                    style={{ lineHeight: "20px" }}
                    value={message}
                    name="message"
                    onChange={handleInputChange}
                ></textarea>

                {/* Send Button */}
                <button type="submit" className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                    Send
                </button>
            </form>
        </div>
    )
}
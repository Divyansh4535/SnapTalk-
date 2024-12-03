import React, { useState, useRef, useContext } from "react";
import UserContext from "./Context/userContext";

export default function ChatBox({ socket }) {
  const textareaRef = useRef(null);
  const {
    message,
    setMessage,
    messages,
    setMessages,
    roomId,
    setRoomId,
    roomName,
    setRoomName,
    socketId,
    setSocketId,
  } = useContext(UserContext);

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
    e.preventDefault();
    socket.emit("message", { roomId, message });
    setMessage("");
    // setRoomId("")
  };

  const handleRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      {/* Chat Area (Example) */}
      <header className="w-full h-18 text-center text-white text-sm  flex items-start py-2 justify-center px-4 gap-2">
        <div className="w-[80%] flex items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white  ">
            <img
              src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
              alt="Divyanshu"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-lg font-semibold">Divyanshu </h1>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </header>
      <div className="flex-1  bg-gray-800 overflow-y-auto p-4 scrollbar">
        {/* Example messages */}
        {/* <div className="rytMsg">Dk : hlo </div>
                <div className="lftMsg">Sumit : hy  </div> */}
        {messages.map((msg, idx) => (
          <div className="rytMsg" key={idx}>
            {msg}{" "}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleRoom}
        className="w-full h-auto bg-gray-900 flex items-end px-3 py-2"
      >
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
        <button
          type="submit"
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Join Room
        </button>
      </form>

      {/* Input Field */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto bg-gray-900 flex items-end px-3 py-2"
      >
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
        <button
          type="submit"
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// import React, { useState, useRef, useContext, useEffect } from "react";
// import UserContext from "./Context/userContext";

// export default function ChatBox({ socket }) {
//   const textareaRef = useRef(null);
//   const {
//     message,
//     setMessage,
//     messages,
//     setMessages,
//     roomId,
//     setRoomId,
//     roomName,
//     setRoomName,
//   } = useContext(UserContext);

//   // Adjust textarea height dynamically
//   const adjustHeight = (textarea) => {
//     textarea.style.height = "auto";
//     const maxHeight = 5 * 24; // Maximum height for 5 lines
//     textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
//   };

//   const handleInputChange = (e, setter) => {
//     const textarea = textareaRef.current;
//     setter(e.target.value);
//     if (textarea) adjustHeight(textarea);
//   };

//   const handleRoomSubmit = (e) => {
//     e.preventDefault();
//     if (roomName.trim()) {
//       socket.emit("join-room", roomName);
//       setRoomName("");
//     }
//   };

//   const handleMessageSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && roomId) {
//       socket.emit("message", { roomId, message });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on("receive-message", (roomId, receivedMessage) => {
//         setMessages((prev) => [...prev, { roomId, message: receivedMessage }]);
//       });
//     }
//     return () => {
//       if (socket) socket.off("receive-message");
//     };
//   }, [socket, setMessages]);

//   return (
//     <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
//       {/* Header */}
//       <header className="w-full h-18 text-center flex items-center justify-between p-4 border-b border-gray-700">
//         <div className="flex items-center gap-2">
//           <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
//             <img
//               src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
//               alt="User"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <h1 className="text-lg font-semibold">Chat Room</h1>
//             <p className="text-sm text-gray-400">
//               {roomName || "No room joined"}
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Chat Content */}
//       <div className="flex-1 bg-gray-800 p-4 overflow-y-auto scrollbar">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`${msg.roomId === roomId ? "rytMsg" : "lftMsg"} `}
//           >
//             {msg.message}
//           </div>
//         ))}
//       </div>

//       {/* Room Form */}
//       <form
//         onSubmit={handleRoomSubmit}
//         className="w-full flex items-center p-3 bg-gray-900 border-t border-gray-700"
//       >
//         <textarea
//           ref={textareaRef}
//           className="flex-1 p-2 bg-gray-800 text-white rounded-lg resize-none"
//           placeholder="Enter Room Name"
//           value={roomName}
//           onChange={(e) => handleInputChange(e, setRoomName)}
//         ></textarea>
//         <button
//           type="submit"
//           className="ml-3 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
//         >
//           Join
//         </button>
//       </form>

//       {/* Message Form */}
//       <form
//         onSubmit={handleMessageSubmit}
//         className="w-full flex items-center p-3 bg-gray-900 border-t border-gray-700"
//       >
//         <textarea
//           ref={textareaRef}
//           className="flex-1 p-2 bg-gray-800 text-white rounded-lg resize-none"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => handleInputChange(e, setMessage)}
//         ></textarea>
//         <button
//           type="submit"
//           className="ml-3 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

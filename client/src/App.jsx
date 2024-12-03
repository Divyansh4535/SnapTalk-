import React, { useContext, useEffect } from "react";
import ChatBox from "./ChatBox";
import io from "socket.io-client";
import { useMemo } from "react";
import UserContext from "./Context/userContext";

const App = () => {
  const {
    message,
    messages,
    setMessages,
    setMessage,
    roomId,
    setRoomId,
    socketId,
    setSocketId,
  } = useContext(UserContext);

  const socket = useMemo(() => io("http://localhost:3000"), []);
  console.log("messages :->", messages);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected :-> ", socket.id);
    });

    socket.on("receive-message", (roomId, message) => {
      console.log("receive-message", roomId, message);
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const ChatListContacts = [
    {
      id: 1,
      name: "Aarav Patel",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Aarav",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Priya",
      lastMessage: "Can we meet tomorrow?",
      time: "9:45 AM",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Arjun",
      lastMessage: "Thanks for your help!",
      time: "Yesterday",
    },
    {
      id: 4,
      name: "Zara Mehta",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Zara",
      lastMessage: "The meeting is at 2 PM",
      time: "Yesterday",
    },
    {
      id: 5,
      name: "Rohan Singh",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Rohan",
      lastMessage: "Please send the files",
      time: "2 days ago",
    },
    {
      id: 6,
      name: "Ananya Gupta",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Ananya",
      lastMessage: "Great work on the project!",
      time: "2 days ago",
    },
    {
      id: 7,
      name: "Vihaan Reddy",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Vihaan",
      lastMessage: "Let's catch up soon",
      time: "3 days ago",
    },
    {
      id: 8,
      name: "Ishaan Malhotra",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Ishaan",
      lastMessage: "Did you see my email?",
      time: "4 days ago",
    },
    {
      id: 9,
      name: "Riya Kapoor",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Riya",
      lastMessage: "The presentation looks good",
      time: "5 days ago",
    },
    {
      id: 10,
      name: "Aisha Verma",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Aisha",
      lastMessage: "Happy birthday! 🎉",
      time: "1 week ago",
    },
  ];

  return (
    <div className="w-screen h-screen bg-teal-500 flex items-center justify-between ">
      <div className="  h-full w-[30%] flex items-center justify-between flex-col ">
        <header className="w-full h-20 bg-gray-800 text-white flex items-center gap-4 px-4 border-b border-white  shadow-gray-600">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <img
              className="w-full h-full object-cover"
              alt="a person with a blue shirt that says the name of the person"
              src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Divyanshu  </h1>
            <h3 className="text-sm text-gray-400">Id : {socketId}</h3>
            <p className="text-sm text-gray-400">
              Status or additional information
            </p>  
          </div>
        </header>
        <section className="w-full h-[90%] text-white overflow-y-auto scrollbar bg-gray-800">
          {ChatListContacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between w-full">
                  {" "}
                  <h2>{contact.name}</h2>{" "}
                  <span className="text-xs"> {contact.time} </span>
                </div>
                <p className="text-sm text-gray-400">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      <div className="w-[70%] shadow-xl  shadow-gray-600 h-full bg-blue-400 flex items-center justify-between flex-col ">
        <ChatBox socket={socket} />
      </div>
    </div>
  );
};

export default App;

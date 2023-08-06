import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatPage from "./components/ChatPage";

const App: React.FC = () => {
  const [userData, setUserData] = useState<{
    userName: string;
    channelName: string;
  }>({
    userName: "",
    channelName: "",
  });

  const handleNameAndChannelSubmit = (name: string, channel: string) => {
    setUserData({ userName: name, channelName: channel });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage onNameAndChannelSubmit={handleNameAndChannelSubmit} />
        }
      />
      <Route
        path="/chat"
        element={
          userData.userName && userData.channelName ? (
            <ChatPage {...userData} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;

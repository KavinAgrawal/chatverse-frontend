import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { styles } from "./styles";
import { Props } from "./types";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC<Props> = ({ onNameAndChannelSubmit }) => {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();

  const handleStartChatting = () => {
    if (userName.trim() !== "" && channelName.trim() !== "") {
      onNameAndChannelSubmit(userName, channelName);
      navigate("/chat");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={styles.box}>
        <div style={styles.chatLogo}>🗨️</div>
        <Typography variant="h4" sx={styles.heading}>
          Welcome to ChatVerse!
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={styles.subtitle}
        >
          Please enter your name to start chatting.
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          sx={styles.textField}
        />
        <TextField
          variant="outlined"
          fullWidth
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Channel Name"
          sx={styles.textField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartChatting}
          sx={styles.startButton}
        >
          Start Chatting
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;

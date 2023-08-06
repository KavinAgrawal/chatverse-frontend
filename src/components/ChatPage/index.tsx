import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Typography,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Send as SendIcon, Edit as EditIcon } from "@mui/icons-material";
import { Message, Props, Reply } from "./types";
import { styles } from "./styles";

const ChatPage: React.FC<Props> = ({ userName, channelName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const content = newMessage.trim();

    if (replyingTo !== null) {
      const repliedMessage = messages[replyingTo - 1];

      const reply: Reply = {
        id: repliedMessage.replies.length + 1,
        user: userName,
        content,
        timestamp,
      };

      repliedMessage.replies.push(reply);
      setMessages([...messages]);
      setReplyingTo(null);
    } else {
      const newMessageObj: Message = {
        id: messages.length + 1,
        user: userName,
        content,
        timestamp,
        replies: [],
      };

      setMessages([...messages, newMessageObj]);
      setShowEditor(false);
    }
    setNewMessage("");
  };

  const openToggleEditor = () => {
    setShowEditor(true);
    setReplyingTo(null);
    setNewMessage("");
  };

  const handleReply = (messageId: number) => {
    setReplyingTo(messageId);
    setNewMessage("");
    setShowEditor(false);
  };

  const renderAvatar = (text: string): JSX.Element => {
    return (
      <ListItemAvatar>
        <Avatar sx={styles.nameAvatar}>{text[0]}</Avatar>
      </ListItemAvatar>
    );
  };

  const renderMessageBar = (placeholder: string, handleSubmit: () => void) => {
    return (
      <ListItem sx={styles.messageListItem}>
        {renderAvatar(userName)}
        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={placeholder}
          onKeyDown={({ key }: React.KeyboardEvent<HTMLInputElement>) => {
            key === "Enter" && handleSubmit();
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton data-testid="send-button" onClick={handleSubmit}>
                  <SendIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
    );
  };

  const renderMessage = (
    user: string,
    content: string,
    timestamp: string
  ): JSX.Element => {
    return (
      <ListItem sx={styles.messageListItem}>
        {renderAvatar(userName)}
        <ListItemText
          primary={`${user} ${timestamp}`}
          primaryTypographyProps={{ sx: styles.primaryText }}
          secondary={
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              display="inline"
            >
              {content}
            </Typography>
          }
        />
      </ListItem>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={styles.box}>
        <Box sx={styles.channelBox}>
          <Avatar sx={styles.channelAvatar}>{channelName[0]}</Avatar>
          <Typography variant="h5">{channelName}</Typography>
        </Box>
        <Divider sx={styles.divider} />
        <List sx={styles.list}>
          {messages.map((message, index) => (
            <Box key={message.id} sx={styles.messageBox}>
              {renderMessage(message.user, message.content, message.timestamp)}
              {message.replies &&
                message.replies.map((reply) => (
                  <Box key={reply.id} sx={styles.replyBox}>
                    {renderMessage(reply.user, reply.content, reply.timestamp)}
                  </Box>
                ))}
              {replyingTo === message.id ? (
                <Box sx={styles.replyBar}>
                  {renderMessageBar("Type your reply...", handleSend)}
                </Box>
              ) : (
                <Box sx={styles.replyButtonBox}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleReply(message.id)}
                  >
                    Reply
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </List>
      </Box>
      {!showEditor ? (
        <Box sx={styles.newChatButton}>
          <Button
            onClick={openToggleEditor}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            New Chat
          </Button>
        </Box>
      ) : (
        <Box sx={styles.messageBar}>
          {renderMessageBar("Type your message...", handleSend)}
        </Box>
      )}
    </Container>
  );
};

export default ChatPage;

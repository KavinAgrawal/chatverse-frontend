import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatPage from ".";

test("renders ChatPage without errors", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);
  const headerText = screen.getByText("General");
  expect(headerText).toBeInTheDocument();
});

test("clicking on new chat button opens the message bar", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageBar = screen.getByPlaceholderText("Type your message...");
  expect(messageBar).toBeInTheDocument();
});

test("sending a new message updates the messages list", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, {
    target: { value: "Hello, this is a new message!" },
  });

  const sendButton = screen.getByTestId("send-button");
  fireEvent.click(sendButton);

  const sentMessage = screen.getByText("Hello, this is a new message!");
  expect(sentMessage).toBeInTheDocument();
});

test("replying to a message shows the reply input", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  // Sending a new message
  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, {
    target: { value: "Hello, this is a new message!" },
  });

  const sendButton = screen.getByTestId("send-button");
  fireEvent.click(sendButton);

  // Replying to the sent message
  const replyButton = screen.getByText("Reply");
  fireEvent.click(replyButton);

  const replyInput = screen.getByPlaceholderText("Type your reply...");
  expect(replyInput).toBeInTheDocument();
});

test("replying to a message updates the replies list", () => {
  render(<ChatPage userName="John" channelName="General" />);

  // Sending a new message
  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, {
    target: { value: "Hello, this is a new message!" },
  });

  const sendButton = screen.getByTestId("send-button");
  fireEvent.click(sendButton);

  // Replying to the sent message
  const replyButton = screen.getByText("Reply");
  fireEvent.click(replyButton);

  const replyInput = screen.getByPlaceholderText("Type your reply...");
  fireEvent.change(replyInput, {
    target: { value: "This is a reply to the message!" },
  });

  const sendReplyButton = screen.getByTestId("send-button");
  fireEvent.click(sendReplyButton);

  const sentReply = screen.getByText("This is a reply to the message!");
  expect(sentReply).toBeInTheDocument();
});

test("new chat button is hidden when message input is open", () => {
  render(<ChatPage userName="John" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  expect(messageInput).toBeInTheDocument();
  expect(newChatButton).not.toBeInTheDocument();
});

test("message input is hidden when new chat button is open", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  const messageInput = screen.queryByPlaceholderText("Type your message...");

  expect(newChatButton).toBeInTheDocument();
  expect(messageInput).not.toBeInTheDocument();
});

test("pressing Enter key in the message input sends the message", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, {
    target: { value: "Hello, this is a new message!" },
  });

  fireEvent.keyDown(messageInput, { key: "Enter" });

  const sentMessage = screen.getByText("Hello, this is a new message!");
  expect(sentMessage).toBeInTheDocument();
});

test("sending a empty message does not submit", () => {
  render(<ChatPage userName="Lorem Ipsum" channelName="General" />);

  const newChatButton = screen.getByText("New Chat");
  fireEvent.click(newChatButton);

  const messageInput = screen.getByPlaceholderText("Type your message...");
  fireEvent.change(messageInput, {
    target: { value: "" },
  });

  const sendButton = screen.getByTestId("send-button");
  fireEvent.click(sendButton);

  expect(messageInput).toBeInTheDocument();
});

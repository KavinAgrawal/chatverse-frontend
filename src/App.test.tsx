import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders LandingPage when the route is /", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const landingPageElement = screen.getByText("Welcome to ChatVerse!");
  expect(landingPageElement).toBeInTheDocument();
});

test("redirects to / if directly tried to navigate to /chat directly", () => {
  render(
    <MemoryRouter initialEntries={["/chat"]}>
      <App />
    </MemoryRouter>
  );

  const landingPageElement = screen.getByText("Welcome to ChatVerse!");
  expect(landingPageElement).toBeInTheDocument();
});

test("renders ChatPage (/chat) after pressing submit on LandingPage (/) and user data is available", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const nameInput = screen.getByPlaceholderText("Your Name");
  const channelInput = screen.getByPlaceholderText("Channel Name");
  const startChattingButton = screen.getByRole("button", {
    name: "Start Chatting",
  });

  fireEvent.change(nameInput, { target: { value: "Lorem Ipsum" } });
  fireEvent.change(channelInput, { target: { value: "General" } });
  fireEvent.click(startChattingButton);

  await waitFor(() => {
    const chatPageHeaderElement = screen.getByText("General");
    expect(chatPageHeaderElement).toBeInTheDocument();
  });

  const chatPageButtonElement = screen.getByText("New Chat");
  expect(chatPageButtonElement).toBeInTheDocument();
});

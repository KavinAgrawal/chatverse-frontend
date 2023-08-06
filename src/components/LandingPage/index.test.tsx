import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LandingPage from ".";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("renders LandingPage without errors", () => {
  render(
    <MemoryRouter>
      <LandingPage onNameAndChannelSubmit={() => {}} />
    </MemoryRouter>
  );
});

test("calls onNameAndChannelSubmit and navigates to /chat when Start Chatting button is clicked", () => {
  const mockOnNameAndChannelSubmit = jest.fn();
  render(
    <MemoryRouter>
      <LandingPage onNameAndChannelSubmit={mockOnNameAndChannelSubmit} />
    </MemoryRouter>
  );

  const userNameInput = screen.getByPlaceholderText(
    "Your Name"
  ) as HTMLInputElement;
  const channelNameInput = screen.getByPlaceholderText(
    "Channel Name"
  ) as HTMLInputElement;
  const startChattingButton = screen.getByText(
    "Start Chatting"
  ) as HTMLInputElement;

  fireEvent.change(userNameInput, { target: { value: "Lorem Ipsum" } });
  fireEvent.change(channelNameInput, { target: { value: "General" } });
  fireEvent.click(startChattingButton);

  expect(userNameInput.value).toBe("Lorem Ipsum");
  expect(channelNameInput.value).toBe("General");
  expect(mockOnNameAndChannelSubmit).toHaveBeenCalledWith(
    "Lorem Ipsum",
    "General"
  );
  expect(mockNavigate).toHaveBeenCalledWith("/chat");
});

test("does not submit if Start Chatting button is clicked and no input is provided", () => {
  const mockOnNameAndChannelSubmit = jest.fn();
  render(
    <MemoryRouter>
      <LandingPage onNameAndChannelSubmit={mockOnNameAndChannelSubmit} />
    </MemoryRouter>
  );

  const userNameInput = screen.getByPlaceholderText(
    "Your Name"
  ) as HTMLInputElement;
  const channelNameInput = screen.getByPlaceholderText(
    "Channel Name"
  ) as HTMLInputElement;
  const startChattingButton = screen.getByText(
    "Start Chatting"
  ) as HTMLInputElement;

  fireEvent.change(userNameInput, { target: { value: "" } });
  fireEvent.change(channelNameInput, { target: { value: "" } });
  fireEvent.click(startChattingButton);

  expect(mockOnNameAndChannelSubmit).not.toHaveBeenCalledWith();
  expect(mockNavigate).not.toHaveBeenCalledWith("/chat");
});

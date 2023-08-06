import React from "react";

jest.mock("react-dom/client", () => {
  const render = jest.fn().mockName("render");
  return {
    ...jest.requireActual("react-dom/client"),
    createRoot: jest.fn().mockName("createRoot").mockReturnValue({ render }),
  };
});

let documentSpy = jest.spyOn(document, "getElementById");

test("Entry point index test", () => {
  const doc = document.createElement("div");
  doc.setAttribute("id", "root");
  require("./index.tsx");
  expect(documentSpy).toHaveBeenCalledWith("root");
});

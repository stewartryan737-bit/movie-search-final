import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");
jest.mock("react-router-dom", () => {
  global.TextEncoder = require("util").TextEncoder;
  require("react-app-polyfill/jsdom");
  return jest.requireActual("react-router");
});

test("opens movie details when a search result is clicked", async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes("?s=")) {
      return Promise.resolve({
        data: {
          Response: "True",
          Search: [{ imdbID: "tt123", Title: "Example", Year: "2020", Poster: "N/A" }],
        },
      });
    }

    return Promise.resolve({
      data: { Response: "True", Title: "Example", Plot: "An example plot.", Poster: "N/A" },
    });
  });

  render(<App />);
  await screen.findByRole("link", { name: /Example/ });
  fireEvent.change(screen.getByPlaceholderText("Search for movies..."), {
    target: { value: "example movie" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));
  const card = await screen.findByRole("link", { name: /Example/ });
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("?s=example%20movie&"));
  expect(card).toHaveAttribute("href", "/movie/tt123");
  fireEvent.click(card);

  expect(await screen.findByText("An example plot.")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/movie/tt123");
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("?i=tt123&"));

  fireEvent.click(screen.getByRole("link", { name: "Back to Home" }));
  expect(await screen.findByRole("link", { name: /Example/ })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/");
});

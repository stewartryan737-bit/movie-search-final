import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));

test("shows search results in Home and sorts them", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      Response: "True",
      Search: [
        { imdbID: "1", Title: "Zebra", Year: "2001", Poster: "zebra.jpg" },
        { imdbID: "2", Title: "Apple", Year: "2002", Poster: "apple.jpg" },
      ],
    },
  });

  render(<App />);
  fireEvent.change(screen.getByPlaceholderText("Search for movies..."), {
    target: { value: "test movie" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Zebra")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(
    expect.stringContaining("s=test%20movie")
  );
  fireEvent.change(screen.getByLabelText("Sort by:"), {
    target: { value: "title" },
  });
  expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent))
    .toEqual(["Apple", "Zebra"]);
});

test("shows the search error in Home", async () => {
  axios.get.mockResolvedValueOnce({
    data: { Response: "False", Error: "Movie not found!" },
  });

  render(<App />);
  fireEvent.change(screen.getByPlaceholderText("Search for movies..."), {
    target: { value: "missing" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Movie not found!");
});

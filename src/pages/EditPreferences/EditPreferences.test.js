import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import EditPreferences from "./EditPreferences";
import axios from "axios";
import useApi from "../../services/useApi";
import "@testing-library/jest-dom";

jest.mock("axios");
jest.mock("../../services/useApi");

const feature = loadFeature(__dirname + "/EditPreferences.feature");

defineFeature(feature, (test) => {
  const mockRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useApi.mockReturnValue({
      request: mockRequest,
      data: null,
      loading: false,
      error: null,
    });
  });

  test("Render user preferences and allow adding a new topic", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the Edit Preferences page", async () => {
      const userProfileData = { id: 1, preferences: "Football, Music" };
      mockRequest.mockResolvedValueOnce({ data: [userProfileData] });

      const history = createMemoryHistory();
      await act(async () => {
        render(
          <Router location={history.location} navigator={history}>
            <EditPreferences />
          </Router>
        );
      });
    });

    when("the user adds a new topic", async () => {
      await waitFor(() => {
        expect(screen.getByText("Football")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText(
        "Escriba un tema del que te guste hablar"
      );
      fireEvent.change(input, { target: { value: "Technology" } });

      const saveButton = screen.getByText("Guardar");
      fireEvent.click(saveButton);

      axios.patch.mockResolvedValueOnce({
        data: { preferences: "Football, Music, Technology" },
      });

      await act(async () => {
        await axios.patch();
      });
    });

    then("the new topic should be added to the preferences", async () => {
      await waitFor(() => {
        expect(screen.getByText("Technology")).toBeInTheDocument();
      });
    });
  });

  test("Remove a topic from preferences", ({ given, when, then }) => {
    given("the user is on the Edit Preferences page", async () => {
      const userProfileData = { id: 1, preferences: "Football, Music" };
      mockRequest.mockResolvedValueOnce({ data: [userProfileData] });

      const history = createMemoryHistory();
      await act(async () => {
        render(
          <Router location={history.location} navigator={history}>
            <EditPreferences />
          </Router>
        );
      });
    });

    when("the user removes a topic", async () => {
      await waitFor(() => {
        expect(screen.getByText("Football")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });

      const removeButton = screen.getAllByText("❌")[0];
      fireEvent.click(removeButton);

      axios.patch.mockResolvedValueOnce({
        data: { preferences: "Music" },
      });

      await act(async () => {
        await axios.patch();
      });
    });

    then("the topic should be removed from the preferences", async () => {
      await waitFor(() => {
        expect(screen.queryByText("Football")).not.toBeInTheDocument();
      });
    });
  });

  test("Show error when adding an empty topic", ({ given, when, then }) => {
    given("the user is on the Edit Preferences page", async () => {
      const userProfileData = { id: 1, preferences: "Football, Music" };
      mockRequest.mockResolvedValueOnce({ data: [userProfileData] });

      const history = createMemoryHistory();
      await act(async () => {
        render(
          <Router location={history.location} navigator={history}>
            <EditPreferences />
          </Router>
        );
      });
    });

    when("the user tries to add an empty topic", async () => {
      await waitFor(() => {
        expect(screen.getByText("Football")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });

      const saveButton = screen.getByText("Guardar");
      fireEvent.click(saveButton);
    });

    then("an error message should be displayed", async () => {
      await waitFor(() => {
        expect(
          screen.getByText("El tema no puede estar vacío.")
        ).toBeInTheDocument();
      });
    });
  });

  test("Show error when adding a duplicate topic", ({ given, when, then }) => {
    given("the user is on the Edit Preferences page", async () => {
      const userProfileData = { id: 1, preferences: "Football, Music" };
      mockRequest.mockResolvedValueOnce({ data: [userProfileData] });

      const history = createMemoryHistory();
      await act(async () => {
        render(
          <Router location={history.location} navigator={history}>
            <EditPreferences />
          </Router>
        );
      });
    });

    when("the user tries to add a duplicate topic", async () => {
      await waitFor(() => {
        expect(screen.getByText("Football")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText(
        "Escriba un tema del que te guste hablar"
      );
      fireEvent.change(input, { target: { value: "Football" } });

      const saveButton = screen.getByText("Guardar");
      fireEvent.click(saveButton);
    });

    then("an error message should be displayed", async () => {
      await waitFor(() => {
        expect(
          screen.getByText("Este tema ya está en tus preferencias.")
        ).toBeInTheDocument();
      });
    });
  });
});

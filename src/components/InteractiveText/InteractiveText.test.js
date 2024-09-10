import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import InteractiveText from "./InteractiveText";
import useApi from "../../services/useApi";

jest.mock("../../services/useApi");

const feature = loadFeature(__dirname + "/InteractiveText.feature");

defineFeature(feature, (test) => {
  const mockRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useApi.mockReturnValue({
      request: mockRequest,
      loading: false,
      error: null,
    });
    mockRequest.mockResolvedValue({
      data: [{ name: "Juan" }],
    });
  });

  test("Loading the user profile", ({ given, when, then }) => {
    given("the user is on the interactive text component", () => {
      useApi.mockReturnValue({
        request: mockRequest,
        loading: true,
        error: null,
      });
    });

    when("the component is loading the user profile", async () => {
      await act(async () => {
        render(<InteractiveText isTalking={false} />);
      });
    });

    then('the component should display "Cargando..."', () => {
      expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });
  });

  test("User profile fails to load", ({ given, when, then }) => {
    given("the user is on the interactive text component", () => {
      useApi.mockReturnValue({
        request: mockRequest,
        loading: false,
        error: "Error fetching data",
      });
    });

    when("there is an error fetching the user profile", async () => {
      await act(async () => {
        render(<InteractiveText isTalking={false} />);
      });
    });

    then("the component should display an error message", () => {
      expect(
        screen.getByText("Error al cargar el perfil del usuario.")
      ).toBeInTheDocument();
    });
  });

  test("User profile loads successfully", ({ given, when, then }) => {
    given("the user is on the interactive text component", () => {
      useApi.mockReturnValue({
        request: mockRequest,
        loading: false,
        error: null,
      });
      mockRequest.mockResolvedValue({
        data: [{ name: "Juan" }],
      });
    });

    when("the user profile is loaded", async () => {
      await act(async () => {
        render(<InteractiveText isTalking={false} />);
      });
    });

    then(
      "the component should display the user's name and welcome messages",
      async () => {
        expect(await screen.findByText("¡Hola, Juan!")).toBeInTheDocument();
        expect(screen.getByText("¿Cómo estás?")).toBeInTheDocument();
        expect(screen.getByText("¿Te apetece hablar?")).toBeInTheDocument();
      }
    );
  });

  test("User is talking", ({ given, when, then }) => {
    given("the user is talking", () => {});

    when("the component is displaying the talking state", async () => {
      await act(async () => {
        render(<InteractiveText isTalking={true} />);
      });
    });

    then('the component should display "Hablando..."', () => {
      expect(screen.getByText("Hablando...")).toBeInTheDocument();
    });
  });

  test("User has finished talking", ({ given, when, then }) => {
    let rerender;

    given("the user has finished talking", async () => {
      await act(async () => {
        const { rerender: renderAgain } = render(
          <InteractiveText isTalking={true} />
        );
        rerender = renderAgain;
      });
    });

    when("the talking state is off", async () => {
      await act(async () => {
        rerender(<InteractiveText isTalking={false} />);
      });
    });

    then(
      'the component should display "¿Te apetece hablar de otra cosa?"',
      async () => {
        await waitFor(() => {
          expect(
            screen.getByText("¿Te apetece hablar de otra cosa?")
          ).toBeInTheDocument();
        });
      }
    );
  });
});

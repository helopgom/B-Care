import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import useApi from "../../services/useApi";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../services/useApi");

describe.only("Login Component", () => {
  const mockRequest = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useApi.mockReturnValue({
      request: mockRequest,
      loading: false,
      error: null,
    });
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/ingresa tu usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingresa tu contraseña/i)).toBeInTheDocument();

    // Cambiado para el botón usando aria-label
    expect(
      screen.getByRole("button", { name: /inicia sesión/i })
    ).toBeInTheDocument(); // El botón "Iniciar sesión"
  });

  it("should update input values on change", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/ingresa tu usuario/i);
    const passwordInput = screen.getByLabelText(/ingresa tu contraseña/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls request function on form submit and navigates to /home", async () => {
    mockRequest.mockResolvedValue({ data: { token: "mockToken" } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await act(async () => {
      const usernameInput = screen.getByLabelText(/ingresa tu usuario/i); // Para inputs
      const passwordInput = screen.getByLabelText(/ingresa tu contraseña/i); // Para inputs
      const submitButton = screen.getByRole("button", {
        name: /inicia sesión/i,
      }); // Usar getByRole para el botón

      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    expect(mockRequest).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123",
    });

    await waitFor(() =>
      expect(localStorage.getItem("token")).toBe("mockToken")
    );
    await waitFor(() =>
      expect(localStorage.getItem("username")).toBe("testuser")
    );
  });

  it("displays error when login fails", async () => {
    const mockError = { message: "Invalid credentials" };
    useApi.mockReturnValue({
      request: jest.fn().mockRejectedValue(mockError),
      loading: false,
      error: mockError,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await act(async () => {
      const usernameInput = screen.getByLabelText(/ingresa tu usuario/i);
      const passwordInput = screen.getByLabelText(/ingresa tu contraseña/i);
      const submitButton = screen.getByRole("button", {
        name: /inicia sesión/i,
      });

      fireEvent.change(usernameInput, {
        target: { value: "invalid_username" },
      });
      fireEvent.change(passwordInput, {
        target: { value: "invalid_password" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(/invalid credentials/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays plaintext error when login fails", async () => {
    const mockError = "Invalid credentials";
    useApi.mockReturnValue({
      request: jest.fn().mockRejectedValue(mockError),
      loading: false,
      error: mockError,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await act(async () => {
      const usernameInput = screen.getByLabelText(/ingresa tu usuario/i);
      const passwordInput = screen.getByLabelText(/ingresa tu contraseña/i);
      const submitButton = screen.getByRole("button", {
        name: /inicia sesión/i,
      });

      fireEvent.change(usernameInput, {
        target: { value: "invalid_username" },
      });
      fireEvent.change(passwordInput, {
        target: { value: "invalid_password" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(/invalid credentials/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("navigates to /register", async () => {
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await act(async () => {
      const registerButton = screen.getByRole("button", {
        name: /crea tu nueva cuenta/i,
      });

      fireEvent.click(registerButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});

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
import EditPersonalData from "./EditPersonalData";
import useApi from "../../services/useApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/useApi");

describe("EditPersonalData Component", () => {
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

  it.only("should render the form and fetch user data", async () => {
    const mockUserData = {
      id: 1,
      name: "John Doe",
      birth_date: "1990-01-01",
      phone: "123456789",
    };

    mockRequest.mockResolvedValue({ data: [mockUserData] });

    render(
      <MemoryRouter>
        <EditPersonalData />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue("1990-01-01")).toBeInTheDocument();
      expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
    });
  });

  it("should update input values on change", async () => {
    const mockUserData = {
      id: 1,
      name: "John Doe",
      birth_date: "1990-01-01",
      phone: "123456789",
    };

    mockRequest.mockResolvedValue({ data: [mockUserData] });
    render(
      <MemoryRouter>
        <EditPersonalData />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/nombre/i), {
        target: { value: "Jane Doe" },
      });
    });

    expect(screen.getByDisplayValue(/Jane Doe/i)).toBeInTheDocument();
  });

  it("should save updated user data", async () => {
    const mockUserData = {
      id: 1,
      name: "John Doe",
      birth_date: "1990-01-01",
      phone: "123456789",
    };

    mockRequest.mockResolvedValue({ data: [mockUserData] });

    render(
      <MemoryRouter>
        <EditPersonalData />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/nombre/i), {
        target: { value: "Jane Doe" },
      });
    });

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `${userProfileEndpoint}1/`,
        { name: "Jane Doe" },
        expect.any(Object)
      );
    });

    expect(
      screen.getByText(/¡datos guardados con éxito!/i)
    ).toBeInTheDocument();
  });

  it("should navigate to /myaccount when cancel is clicked", async () => {
    render(
      <MemoryRouter>
        <EditPersonalData />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/myaccount");
  });

  it("should display error when fetching user data fails", async () => {
    mockRequest.mockRejectedValueOnce(
      new Error("Error al obtener los datos del usuario")
    );

    render(
      <MemoryRouter>
        <EditPersonalData />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error al obtener los datos del usuario/i)
      ).toBeInTheDocument();
    });
  });
});

import { loadFeature, defineFeature } from "jest-cucumber";
import { renderHook, act } from "@testing-library/react";
import useApi from "./useApi";
import axios from "axios";

jest.mock("axios");

const feature = loadFeature(__dirname + "/useApi.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Successful GET request", ({ given, when, then }) => {
    let result;
    let request;

    given('the API endpoint is "/api/v1/data"', () => {
      ({ result } = renderHook(() =>
        useApi({ apiEndpoint: "/api/v1/data", method: "GET" })
      ));
      request = result.current.request;
    });

    when("the user makes a GET request", async () => {
      axios.mockResolvedValue({ data: { message: "success" } });
      await act(async () => {
        await request();
      });
    });

    then("the data should be successfully fetched", () => {
      expect(result.current.data).toEqual({ message: "success" });
    });

    then("the loading state should be false", () => {
      expect(result.current.loading).toBe(false);
    });
  });

  test("Error in API request", ({ given, when, then }) => {
    let result;
    let request;

    given('the API endpoint is "/api/v1/invalid"', () => {
      ({ result } = renderHook(() =>
        useApi({ apiEndpoint: "/api/v1/invalid", method: "GET" })
      ));
      request = result.current.request;
    });

    when("the user makes a GET request", async () => {
      axios.mockRejectedValue(new Error("Request failed"));
      await act(async () => {
        try {
          await request();
        } catch (err) {}
      });
    });

    then("an error should be returned", () => {
      expect(result.current.error).toBe("Request failed");
    });

    then("the loading state should be false", () => {
      expect(result.current.loading).toBe(false);
    });
  });
});

import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

const feature = loadFeature(__dirname + "/Footer.feature");

defineFeature(feature, (test) => {
  test("User clicks the emergency button", ({ given, when, then }) => {
    let buttonElement;

    given("the user is on the footer", () => {
      const { getByText } = render(<Footer />);
      buttonElement = getByText(/EMERGENCIA/i);
    });

    when('the user clicks on the "EMERGENCIA" button', () => {
      delete window.location;
      window.location = { href: "" };

      fireEvent.click(buttonElement);
    });

    then("the phone dialer should be called with 112", () => {
      expect(window.location.href).toBe("tel:112");
    });
  });
});

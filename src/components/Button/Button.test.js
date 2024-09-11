import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

const feature = loadFeature(__dirname + "/Button.feature");

defineFeature(feature, (test) => {
  test("User clicks the button with onClick handler", ({
    given,
    when,
    then,
  }) => {
    let handleClick;

    given("the button is rendered with a custom onClick handler", () => {
      handleClick = jest.fn();
      render(
        <Button
          text="Click me"
          backgroundColor="blue"
          textColor="white"
          borderColor="black"
          onClick={handleClick}
        />
      );
    });

    when("the user clicks the button", () => {
      fireEvent.click(screen.getByText("Click me"));
    });

    then("the onClick handler should be called", () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  test("User clicks the button with a link", ({ given, when, then }) => {
    given("the button is rendered with a link", () => {
      delete window.location;
      window.location = { href: "" };
      render(
        <Button
          text="Go to Google"
          backgroundColor="blue"
          textColor="white"
          borderColor="black"
          link="https://www.google.com"
        />
      );
    });

    when("the user clicks the button", () => {
      fireEvent.click(screen.getByText("Go to Google"));
    });

    then("the user should be redirected to the link", () => {
      expect(window.location.href).toBe("https://www.google.com");
    });
  });
});

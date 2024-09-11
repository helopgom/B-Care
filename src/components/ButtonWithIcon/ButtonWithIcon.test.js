import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonWithIcon from "./ButtonWithIcon";

const feature = loadFeature(__dirname + "/ButtonWithIcon.feature");

defineFeature(feature, (test) => {
  test("User clicks the button while recording", ({
    given,
    when,
    then,
    and,
  }) => {
    let handleClick;

    given("the button is in recording state", () => {
      handleClick = jest.fn();
      render(<ButtonWithIcon isRecording={true} onClick={handleClick} />);
    });

    when("the user clicks the button", () => {
      fireEvent.click(screen.getByRole("button"));
    });

    then("the onClick handler should be called", () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    and('the button should display the "talking" state', () => {
      expect(
        screen.getByRole("button").querySelector(".talking")
      ).toBeInTheDocument();
    });
  });

  test("User clicks the button while not recording", ({
    given,
    when,
    then,
    and,
  }) => {
    let handleClick;

    given("the button is not in recording state", () => {
      handleClick = jest.fn();
      render(<ButtonWithIcon isRecording={false} onClick={handleClick} />);
    });

    when("the user clicks the button", () => {
      fireEvent.click(screen.getByRole("button"));
    });

    then("the onClick handler should be called", () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    and('the button should display the "not-talking" state', () => {
      expect(
        screen.getByRole("button").querySelector(".not-talking")
      ).toBeInTheDocument();
    });
  });
});

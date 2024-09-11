import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

const feature = loadFeature(__dirname + "/Card.feature");

defineFeature(feature, (test) => {
  test("User clicks the edit button on the card", ({ given, when, then }) => {
    let onIconClickMock;
    let getByText;
    let getByAltText;

    given("the card is displayed with a title and content", () => {
      onIconClickMock = jest.fn();
      const { getByText: getText, getByAltText: getAltText } = render(
        <Card title="Card Title" onIconClick={onIconClickMock}>
          <p>Card Content</p>
        </Card>
      );
      getByText = getText;
      getByAltText = getAltText;

      expect(getByText("Card Title")).toBeInTheDocument();
      expect(getByText("Card Content")).toBeInTheDocument();
    });

    when("the user clicks the edit button", () => {
      const editButton = getByAltText("Editar");
      fireEvent.click(editButton);
    });

    then("the onIconClick function should be called", () => {
      expect(onIconClickMock).toHaveBeenCalled();
    });
  });
});

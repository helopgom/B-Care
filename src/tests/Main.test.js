import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { router } from "../router/router";
import "@testing-library/jest-dom"; // Extiende las expectativas de Jest con @testing-library

const feature = loadFeature(__dirname + "/Main.feature");

defineFeature(feature, (test) => {
  test("Application renders successfully", ({ given, when, then }) => {
    let container;

    given("the application is initialized", () => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    when("the application is rendered", () => {
      render(<RouterProvider router={router} />, { container });
    });

    then("the router should be provided", () => {
      // Buscar el <main> que ya existe en el Layout
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });
});

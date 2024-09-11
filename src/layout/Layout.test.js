import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Router, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import Layout from "./Layout";
import Footer from "../components/Footer/Footer";
import "@testing-library/jest-dom";

jest.mock("../components/Footer/Footer", () => () => (
  <div>Footer Component</div>
));

const feature = loadFeature(__dirname + "/Layout.feature");

defineFeature(feature, (test) => {
  const history = createMemoryHistory();

  test("Footer is hidden on home and register pages", ({ given, then }) => {
    given("the user is on the home page", () => {
      history.push("/");
      render(
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<div>Home Page</div>} />
            </Route>
          </Routes>
        </Router>
      );
    });

    then("the footer should not be displayed", () => {
      const footer = screen.queryByText(/Footer Component/i);
      expect(footer).not.toBeInTheDocument();
    });
  });

  test("Footer is shown on other pages", ({ given, then }) => {
    given("the user is on the dashboard page", () => {
      history.push("/dashboard");
      render(
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            </Route>
          </Routes>
        </Router>
      );
    });

    then("the footer should be displayed", () => {
      const footer = screen.getByText(/Footer Component/i);
      expect(footer).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForTest from "../for-test";

test("Should render a component ForTest", () => {
    render(<ForTest name="Lucas" />);
    expect(screen.getByText("Nome: Lucas")).toBeInTheDocument();
});
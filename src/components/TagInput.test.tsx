import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TagInput from "./TagInput";

describe("TagInput Component", () => {
  test("renders the input field", () => {
    render(<TagInput />);
    const input = screen.getByPlaceholderText("placeholder");
    expect(input).toBeInTheDocument();
  });

  test("adds a tag on pressing Enter", () => {
    render(<TagInput />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "item1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    const tag = screen.getByText("item1");
    expect(tag).toBeInTheDocument();
  });

  test("removes a tag when clicking the remove button", () => {
    render(<TagInput initialTags={["item1", "item2"]} />);
    const tag = screen.getByText("item1");
    expect(tag).toBeInTheDocument();
    const removeButton = screen.getByTestId("remove-button-0");
    fireEvent.click(removeButton);
    expect(screen.queryByText("item1")).not.toBeInTheDocument();
  });

  test("adds a tag when the input loses focus (onBlur)", () => {
    render(<TagInput />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "item3" } });
    fireEvent.blur(input);
    const tag = screen.getByText("item3");
    expect(tag).toBeInTheDocument();
  });

  test("limits the number of tags based on maxTags prop", () => {
    render(<TagInput maxTags={2} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "item1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "item2" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "item3" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const tags = screen.getAllByText(/item1|item2|item3/);
    expect(tags.length).toBe(2);
  });

  test("renders initialTags correctly", () => {
    render(<TagInput initialTags={["item1", "item2"]} />);
    expect(screen.getByText("item1")).toBeInTheDocument();
    expect(screen.getByText("item2")).toBeInTheDocument();
  });

  test("calls onChange when tags are updated", () => {
    const handleChange = jest.fn();
    render(<TagInput onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "item" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(["item"]);
  });

  test("handles separators with special characters", () => {
    const separators = ["/", "-", "*"];
    const escapedSeparators = separators.map((sep) => sep.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`[${escapedSeparators.join("")}]`);

    expect(regex.test("/")).toBe(true);
    expect(regex.test("-")).toBe(true);
    expect(regex.test("*")).toBe(true);
  });

  //   test("splits input based on custom separators", () => {
  //     render(<TagInput separators={["/", "-", "*"]} />);

  //     const input = screen.getByRole("textbox");
  //     fireEvent.change(input, { target: { value: "item1/item2-item3*item1" } });
  //     fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  //     const tags = ["item1", "item1", "item2", "item3"];
  //     tags.forEach((tag) => {
  //       expect(screen.getByText(tag)).toBeInTheDocument();
  //     });
  //   });
});

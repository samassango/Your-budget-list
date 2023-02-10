import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddItemForm from "./index";

describe("AddItemForm", () => {
  it("renders the form with inputs and a submit button", () => {
    const onSubmitForm = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddItemForm onSubmitForm={onSubmitForm} />
    );
    const itemNameInput = getByPlaceholderText("Item Name");
    const itemPriceInput = getByPlaceholderText("Item Price");
    const submitButton = getByText("Submit");

    expect(itemNameInput).toBeInTheDocument();
    expect(itemPriceInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("updates the form state when input values change", () => {
    const onSubmitForm = jest.fn();
    const { getByPlaceholderText } = render(
      <AddItemForm onSubmitForm={onSubmitForm} />
    );
    const itemNameInput = getByPlaceholderText("Item Name");
    const itemPriceInput = getByPlaceholderText("Item Price");

    fireEvent.change(itemNameInput, { target: { value: "item 1" } });
    fireEvent.change(itemPriceInput, { target: { value: "10" } });

    expect(itemNameInput.value).toBe("item 1");
    expect(itemPriceInput.value).toBe("10");
  });

  it("calls the onSubmitForm function with the correct data when submit button is clicked", () => {
    const onSubmitForm = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddItemForm onSubmitForm={onSubmitForm} />
    );
    const itemNameInput = getByPlaceholderText("Item Name");
    const itemPriceInput = getByPlaceholderText("Item Price");
    const submitButton = getByText("Submit");

    fireEvent.change(itemNameInput, { target: { value: "item 1" } });
    fireEvent.change(itemPriceInput, { target: { value: "10" } });
    fireEvent.click(submitButton);

    expect(onSubmitForm).toHaveBeenCalledWith({
      itemName: "item 1",
      itemPrice: 10,
      isDone: false
    });
  });
});

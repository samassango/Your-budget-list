import React, { useState } from "react";

interface IFormData {
  itemName: string;
  itemPrice: number;
  isDone: boolean;
}
interface IFormProps {
  onSubmitForm: (data: IFormData) => void;
}
const AddItemForm = ({ onSubmitForm }: IFormProps) => {
  const [form, setForm] = useState({
    itemName: "",
    itemPrice: 0,
    isDone: false
  });
  return (
    <form
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      <input
        style={{
          padding: "5px",
          margin: "5px",
          height: "30px",
          fontSize: "15px",
          fontWeight: "bold"
        }}
        placeholder="Item Name"
        value={form.itemName}
        name="itemName"
        onChange={(e) => setForm({ ...form, itemName: e.target.value })}
      />
      <input
        style={{
          padding: "5px",
          margin: "5px",
          height: "30px",
          fontSize: "15px",
          fontWeight: "bold"
        }}
        placeholder="Item Price"
        name="itemPrice"
        value={form.itemPrice}
        onChange={(e) =>
          setForm({ ...form, itemPrice: Number(e.target.value) })
        }
      />
      <button
        style={{
          backgroundColor: "teal",
          color: "white",
          width: "auto",
          height: "40px",
          fontSize: "15px",
          fontWeight: "bold"
        }}
        onClick={(e) => {
          e.preventDefault();
          onSubmitForm(form);
          setForm({
            itemName: "",
            itemPrice: 0,
            isDone: false
          });
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default AddItemForm;

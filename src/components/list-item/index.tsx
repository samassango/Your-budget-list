import React from "react";
import "../../styles.css";

interface IProps {
  id: string;
  itemName: string;
  itemPrice: number;
  isDone?: boolean;
  onRemoveItem: (id: string) => void;
  onItemDone: (id: string) => void;
}
const ListItem = ({
  id,
  itemName,
  itemPrice,
  isDone,
  onRemoveItem,
  onItemDone
}: IProps) => {
  return (
    <>
      <div key={id} className="item-Row">
        <span style={{ textDecoration: isDone ? "line-through" : "none" }}>
          <strong>{itemName}</strong>
        </span>
        <span>{`R ${itemPrice.toFixed(2)}`}</span>
        <span>
          <button
            style={{
              backgroundColor: "red",
              margin: "2px",
              color: "white",
              borderColor: "teal"
            }}
            onClick={() => onRemoveItem(id)}
          >
            X
          </button>
        </span>
        <span>
          <button
            style={{
              backgroundColor: "green",
              margin: "2px",
              color: "white",
              borderColor: "teal"
            }}
            onClick={() => onItemDone(id)}
          >
            &#10004;
          </button>
        </span>
      </div>
    </>
  );
};
export default ListItem;

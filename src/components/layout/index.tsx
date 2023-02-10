import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../styles.css";
import { deleteData, readData, writeData, updateOnItemDone } from "../../db";
import AddItemForm from "../add-form";

interface IList {
  id: string;
  itemName: string;
  itemPrice: number;
  isDone?: boolean;
}
interface Iprops {
  WrappedComponent: React.FC<{
    data: IList[];
    onRemoveItem: (id: string) => void;
    onItemDone: (id: string) => void;
  }>;
}
interface IFormData {
  itemName: string;
  itemPrice: number;
  isDone: boolean;
}

const withLayout = ({ WrappedComponent }: Iprops) => {
  return () => {
    const [listData, setListData] = useState<IList[]>([]);

    useEffect(() => {
      const dataList = readData();
      setListData(dataList.data);
    }, []);
    const handleSubmitted = (data: IFormData) => {
      let genId = uuidv4();
      const newData = { ...data, id: genId };
      writeData(newData);
      setListData([...listData, newData]);
    };

    const price = listData?.reduce(
      (accumulator, currentData) => accumulator + currentData.itemPrice,
      0
    );
    const amountUsed = listData?.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.isDone ? currentValue.itemPrice : 0),
      0
    );

    const amountRemaining = listData?.reduce(
      (accumulator, currentValue) =>
        accumulator + (!currentValue.isDone ? currentValue.itemPrice : 0),
      0
    );

    const onRemove = (id: string) => {
      deleteData(id);
      setListData(readData().data);
    };
    const onDone = (id: string) => {
      updateOnItemDone(id);
      setListData(readData().data);
    };
    return (
      <>
        <div className="header">
          <div>
            <img
              src={require("./icon.jpeg")}
              width="100px"
              height="60px"
              alt="icon"
            />
          </div>
          <div>
            <span className="header-title">Your Budget List</span>
            <br />
            <span className="header-notes">Be safe on your pockert</span>
          </div>
        </div>
        <div className="Loyout">
          <AddItemForm onSubmitForm={handleSubmitted} />
        </div>
        <div className="Loyout">
          <WrappedComponent
            data={listData}
            onRemoveItem={onRemove}
            onItemDone={onDone}
          />
        </div>
        <div className="Loyout">
          <div
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <span>Total Costs : </span>
            <span>
              <strong>{`R ${price ? price.toFixed(2) : 0.0}`}</strong>
            </span>
          </div>
        </div>
        <div className="Loyout">
          <div
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <span>Total Amount Spend : </span>
            <span>
              <strong>{`R ${amountUsed ? amountUsed.toFixed(2) : 0.0}`}</strong>
            </span>
          </div>
        </div>
        <div className="Loyout">
          <div
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <span>Total Amount Remaining : </span>

            <span>
              <strong>{`R ${
                amountRemaining ? amountRemaining.toFixed(2) : 0.0
              }`}</strong>
            </span>
          </div>
        </div>
      </>
    );
  };
};
export default withLayout;

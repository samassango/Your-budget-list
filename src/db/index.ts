const store = require("store");
const obj: {
  data: {
    id: string;
    itemName: string;
    itemPrice: number;
    isDone: boolean;
  }[];
} = {
  data: [
    // {
    //   id: "qweewretyphjoiytyyui",
    //   itemName: "White maize meal",
    //   itemPrice: 250.0
    // },
    // {
    //   id: "mnbmbnmbhjoiytyyui",
    //   itemName: "Green paper",
    //   itemPrice: 50.0
    // },
    // {
    //   id: "qweewretyphjoiycvvcbvnn",
    //   itemName: "Pack of Rice",
    //   itemPrice: 200.0
    // }
  ]
};
const DB_NAME = "LIST_DB";

const initDb = () => {
  const json = store.get(DB_NAME);
  console.log({ json });
  if (json) return;
  console.log("I am here");
  store.set(DB_NAME, obj);
  //localStorage.setItem("DB", JSON.stringify(obj));
};
const writeData = (newData: {
  id: string;
  itemName: string;
  itemPrice: number;
  isDone: boolean;
}) => {
  const json = store.get(DB_NAME); //localStorage.getItem("DB");
  //console.log(json);
  if (json) {
    const jsonObj = json;
    jsonObj.data.push(newData);
    store.set(DB_NAME, jsonObj);
    //localStorage.setItem("DB", JSON.stringify(jsonObj));
  } else {
    obj.data.push(newData);
    store.set(DB_NAME, obj);
    //localStorage.setItem("DB", JSON.stringify(obj));
  }
};
const readData = () => {
  //const json = localStorage.getItem("DB");
  const json = store.get(DB_NAME);
  if (json) return json;
  else return obj;
};

const deleteData = (id: string) => {
  const json = store.get(DB_NAME);

  const newJson = json.data.filter((value: any) => value.id !== id);
  store.set(DB_NAME, { data: newJson });
};

const updateOnItemDone = (id: string) => {
  const json = store.get(DB_NAME);
  const newJson = json.data.map((data: any) => {
    if (data.id === id) {
      data["isDone"] = data.isDone ? false : true;
      console.log({ data });
    }
    return data;
  });
  store.set(DB_NAME, { data: newJson });
};

export { initDb, writeData, readData, deleteData, updateOnItemDone };

import ListItem from "../list-item";
import withLayout from "../layout";
const ShoppingList = (props: any) => {
  return (
    <div>
      {props.data.map((data: any) => (
        <ListItem
          {...data}
          onRemoveItem={props.onRemoveItem}
          onItemDone={props.onItemDone}
        />
      ))}
    </div>
  );
};
export default withLayout({ WrappedComponent: ShoppingList });

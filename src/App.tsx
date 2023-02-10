import "./styles.css";
import Shopping from "./components/shopping-list";
import { initDb } from "./db";

export default function App() {
  initDb();
  return (
    <div className="App">
      <Shopping />
    </div>
  );
}

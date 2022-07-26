import { InputFile } from "./components/InputFile";
import "./styles.css";
import { parseCSV } from "./utils/csv";

export default function App() {
  return (
    <div className="App">
      <h1>CSV Reader</h1>
      <InputFile
        onLoadFile={(file) => {
          parseCSV(file).then(console.log);
        }}
      />
    </div>
  );
}

import { useState } from "react";
import { InputFile } from "./components/InputFile";
import "./styles.css";
import { parseCSV } from "./utils/csv";

export default function App() {
  const [data, setData] = useState<any[]>([]);
  return (
    <div className="App">
      <h1>CSV Reader</h1>
      <InputFile
        onLoadFile={(file) => {
          parseCSV(file).then((result) => setData(result));
        }}
      />

      {data.map((row, index) => {
        const data = Object.getOwnPropertyNames(row);

        return (
          <details
            key={index}
            style={{
              alignItems: "flex-start",
              border: "1px solid rgba(0,0,0,.3)",
              display: "flex",
              flexDirection: "column",
              margin: "1em",
              padding: "1em",
              textAlign: "left"
            }}
          >
            <summary>
              <strong>{data[0]}:</strong> {row[data[0]]}
            </summary>
            {data.slice(1).map((header) => (
              <div key={header}>
                <strong>{header}</strong>: {row[header]}
              </div>
            ))}
          </details>
        );
      })}
    </div>
  );
}

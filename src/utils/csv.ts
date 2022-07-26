type TRowData = {
  [key: string]: string;
};

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;

      if (text) {
        resolve(text as string);
      } else {
        reject("cannot load");
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsText(file);
  });
}

export async function parseCSV(file: File, delimiter: string = "\t") {
  const fileAsText = await readFileAsText(file);

  const headers = fileAsText
    .slice(0, fileAsText.indexOf("\n"))
    .split(delimiter)
    .map((header) =>
      header
        .slice(0, header.indexOf("("))
        .trim()
        .replace(/ /g, "-")
        .toLowerCase()
    );

  const rows = fileAsText.slice(fileAsText.indexOf("\n") + 1).split("\n");

  const data = rows.reduce((currentData: TRowData[], row) => {
    const rawData = row.split(delimiter);

    const rowData: TRowData = {};

    headers.forEach((header, index) => {
      rowData[header] = rawData[index];
    });

    return [...currentData, rowData];
  }, []);

  return data;
}

type Props = { onLoadFile?: (file: File) => void };

export function InputFile({ onLoadFile }: Props) {
  return (
    <input
      type="file"
      accept=".tsv"
      onChange={(event) => {
        const file = event.target.files?.[0];

        if (file && onLoadFile) {
          onLoadFile(file);
        }
      }}
    />
  );
}

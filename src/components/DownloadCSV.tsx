import { DownloadCSVProps } from "@/types/DBInterfaces";

const DownloadCSV = <T extends Record<string, unknown>>({
  data,
  fileName,
}: DownloadCSVProps<T>): JSX.Element => {
  const convertToCSV = <T extends Record<string, unknown>>(
    arr: T[]
  ): string => {
    if (!arr.length) return "";
    const headers = Object.keys(arr[0]);
    const lines = [headers.join(",")];

    // Helper to escape fields
    const escapeValue = (val: unknown) => {
      const s = String(val ?? "").replace(/"/g, '""');
      return /[",\r\n]/.test(s) ? `"${s}"` : s;
    };

    // Data rows
    for (const obj of arr) {
      const row = headers.map((key) => escapeValue(obj[key]));
      lines.push(row.join(","));
    }

    return lines.join("\r\n") + "\r\n";
  };

  const downloadCSV = () => {
    const csvStr = convertToCSV(data);
    const blob = new Blob([csvStr], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadCSV;

import axios, * as others from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const Insert = () => {
  const [excelData, setExcelData] = useState([]);

  const jsonToString = (data) => {
    let str = "";
    data.map((row) => {
      str += `(${row["Item Nos"] !== undefined ? row["Item Nos"] : 0},'${
        row["Jewelry Type"] !== undefined ? row["Jewelry Type"] : " "
      }','${row["BRAND"] !== undefined ? row["BRAND"] : " "}','${
        row["Detail"] !== undefined ? row["Detail"] : " "
      }',${row["Gross Wt."] !== undefined ? row["Gross Wt."] : 0},'${
        row["Metal"] !== undefined ? row["Metal"] : " "
      }','${row["Particulars"] !== undefined ? row["Particulars"] : " "}',${
        row["Size #"] !== undefined ? row["Size #"] : 0
      },'${row["Remarks"] !== undefined ? row["Remarks"] : " "}',${
        row["Start Price in US $"] !== undefined
          ? row["Start Price in US $"]
          : 0
      }),`;
    });
    return str.substring(0, str.length - 1);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setExcelData(excelData);
        const values = jsonToString(excelData);
        axios.post("http://localhost:8000/api/create", { values: values });
      } catch (error) {
        console.error("Error reading the Excel file:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleButtonClick = () => document.getElementById("fileInput").click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-black">
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={() => handleButtonClick()}>
        <a
          href="#_"
          className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Button Text</span>
        </a>
      </button>
    </div>
  );
};

export default Insert;

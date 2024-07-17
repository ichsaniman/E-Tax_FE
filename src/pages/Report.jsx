import { React, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import CustomSpinner from "../components/Spinner";
import { useCustomToast } from "../components/Toast";
import { fetchNasabah } from "../apis/reportApi";

function Report() {
  const [cif, setCif] = useState("");
  const [user, setUser] = useState("");
  const [period, setPeriod] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleDownloadForm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/downloadPdf?cif=${user.cif}&startDate=${period}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setIsLoading(false);
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showErrorToast("PDF tidak ada");
    }
  };

  const handleDownloadSummary = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/downloadSummaryPdf?cif=${user.cif}&startDate=${period}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setIsLoading(false);
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showErrorToast("PDF tidak ada");
    }
  };

  const handleEmailTaxForm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sendEtax`,
        {
          cifs: [user.cif],
          startDate: period,
        }
      );
      setIsLoading(false);

      if (response.data[user.cif] === "Email sent successfully") {
        showSuccessToast("Email sent successfully!");
      } else if (
        response.data[user.cif] === "No PDFs with status 'R' to send"
      ) {
        showErrorToast("Email already sent!");
      } else {
        showErrorToast("Unknown response from server.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsLoading(false);
      showErrorToast("Failed to send email.");
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCif(searchText);
  };

  useEffect(() => {
    const getNasabah = async () => {
      if (cif) {
        setIsLoading(true);
        const result = await fetchNasabah(cif);
        setUser(result);
        setIsLoading(false);
      }
    };

    getNasabah();
  }, [cif]);

  return (
    <div className="flex flex-col m-6">
      {isLoading && <CustomSpinner />}
      <h className="text-3xl mb-6">Report</h>
      <form
        className="flex flex-row mb-4 space-x-3"
        onSubmit={handleSearchSubmit}
      >
        <Box>
          <div className="flex flex-col">
            <label className="font-semibold text-lg" htmlFor="period">
              Period
            </label>
            <input
              className="border rounded p-1"
              type="month"
              id="period"
              name="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>

          <Text className="font-semibold text-lg">CIF</Text>
          <div className="">
            <input
              className="border rounded px-4 focus:border-pink-500 focus:outline-none p-1"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter CIF"
            />
          </div>
        </Box>
        <button className="flex self-end h-1/6 border rounded py-1 px-2 bg-[#238FBA] hover:bg-[#263043] font-semibold text-white">
          Search
        </button>
      </form>

      <div className="border rounded-md">
        <h1 className="bg-[#238FBA] border rounded-t-md p-2 text-white font-semibold">
          Detail
        </h1>
        <div className="p-2">
          {Object.entries(user).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
        <div className="flex p-2 gap-2">
          <button
            className="px-2 py-1 rounded bg-orange-500 hover:bg-orange-600 font-semibold text-white flex items-center justify-center"
            onClick={() => handleDownloadForm()}
          >
            Download Tax Form
          </button>
          <button
            className="px-2 py-1 rounded bg-orange-500 hover:bg-orange-600 font-semibold text-white flex items-center justify-center"
            onClick={() => handleEmailTaxForm()}
          >
            Email Tax Form & Report
          </button>
          <button
            className="px-2 py-1 rounded bg-orange-500 hover:bg-orange-600 font-semibold text-white flex items-center justify-center"
            onClick={() => handleDownloadSummary()}
          >
            Download Summary & Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;

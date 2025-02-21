import { React, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import CustomSpinner from "../components/Spinner";
import { useCustomToast } from "../components/Toast";
import { fetchAllNasabah, fetchNasabah } from "../apis/reportApi";

function Report() {
  const [users, setUsers] = useState([]);
  const [cif, setCif] = useState("");
  const [user, setUser] = useState("");
  const [npwp, setNpwp] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [banknpwp, setBanknpwp] = useState("");
  const [namabank, setNamabank] = useState("");
  const [email, setEmail] = useState("");
  const [namaofficetax, setNamaofficetax] = useState("");
  const [period, setPeriod] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleSelectCif = (selectedOption) => {
    const selectedClientId = selectedOption ? selectedOption.value : "";
    setSearchText(selectedClientId);
  };

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
    const getAllNasabah = async () => {
      const result = await fetchAllNasabah();
      const cifs = result.map((user) => ({
        value: user.cif,
        label: user.cif,
      }));
      console.log(cifs);
      setUsers(cifs);
    };
    getAllNasabah();
  }, []);

  useEffect(() => {
    const getNasabah = async () => {
      if (cif) {
        setIsLoading(true);
        const result = await fetchNasabah(cif);
        const {
          npwp,
          nama,
          alamat,
          kota,
          banknpwp,
          namabank,
          email,
          namaofficetax,
        } = result;
        setNpwp(npwp);
        setNama(nama);
        setAlamat(alamat);
        setKota(kota);
        setBanknpwp(banknpwp);
        setNamabank(namabank);
        setEmail(email);
        setNamaofficetax(namaofficetax);
        setUser(result);
        setIsLoading(false);
      }
    };

    getNasabah();
  }, [cif]);

  return (
    <div className="flex flex-col m-6">
      {isLoading && <CustomSpinner />}
      <h className="text-3xl mb-6 font-bold">Laporan</h>
      <form
        className="flex flex-row mb-4 space-x-3"
        onSubmit={handleSearchSubmit}
      >
        <Box className="flex gap-4 items-center justify-center">
          <div className="flex flex-col">
            <label className="font-semibold text-lg" htmlFor="period">
              Bulan
            </label>
            <input
              className="border rounded focus:border-pink-500 focus:outline-none p-1"
              type="month"
              id="period"
              name="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Text className="font-semibold text-lg">CIF</Text>
            <div className="">
              <Select
                onChange={(selectedOption) => handleSelectCif(selectedOption)}
                placeholder="Masukkan CIF"
                isSearchable={true}
                options={users}
                isClearable
              />
            </div>
          </div>
        </Box>
        <button className="flex self-end  border rounded py-1 px-2 bg-[#238FBA] hover:bg-[#263043] font-semibold text-white">
          Cari
        </button>
      </form>

      <div className="border rounded-md">
        <h1 className="bg-[#238FBA]  border rounded-t-md p-2 text-white font-semibold">
          Detail
        </h1>
        <div className="grid grid-cols-3 p-2 gap-3 text-sm mb-4">
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">NPWP</p>
            <input
              className="border rounded"
              type="text"
              value={npwp}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">Nama Kantor Pajak</p>
            <input
              className="border rounded"
              type="text"
              value={namaofficetax}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">Email</p>
            <input
              className="border rounded w-52"
              type="text"
              value={email}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">Nama Nasabah</p>
            <input
              className="border rounded"
              type="text"
              value={nama}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2 col-span-2">
            <p className="font-semibold p-1">NPWP Bank</p>
            <input
              className="border rounded"
              type="text"
              value={banknpwp}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">Kota</p>
            <input
              className="border rounded"
              type="text"
              value={kota}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2 col-span-2">
            <p className="font-semibold p-1">Nama Bank</p>
            <input
              className="border rounded"
              type="text"
              value={namabank}
              disabled
            />
          </div>
          <div className="flex flex-row space-x-2">
            <p className="font-semibold p-1">Alamat</p>
            <input
              className="border rounded"
              type="text"
              value={alamat}
              disabled
            />
          </div>
        </div>
        <div className="flex p-2 gap-2">
          <button
            className="px-2 py-1 rounded bg-[#263043] font-semibold text-white flex items-center justify-center"
            onClick={() => handleDownloadForm()}
          >
            Download Surat Pajak
          </button>
          <button
            className="px-2 py-1 rounded bg-[#263043] font-semibold text-white flex items-center justify-center"
            onClick={() => handleEmailTaxForm()}
          >
            Email Surat Pajak & Laporan
          </button>
          <button
            className="px-2 py-1 rounded bg-[#263043] font-semibold text-white flex items-center justify-center"
            onClick={() => handleDownloadSummary()}
          >
            Download Ringkasan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;

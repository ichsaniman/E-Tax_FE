import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { fetchDeliveryStatus } from "../apis/deliveryStatusApi";
import { useCustomToast } from "../components/Toast";
import CustomSpinner from "../components/Spinner";

function Status() {
  const [deliveryList, setDeliveryList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const allStatuses = ["Success", "Failed"];

  const handleSetPeriod = () => {
    if (startDate && !endDate) {
      searchParams.set("start_date", startDate);
      searchParams.delete("end_date");
    } else if (endDate && !startDate) {
      searchParams.set("end_date", endDate);
      searchParams.delete("start_date");
    } else {
      if (endDate < startDate) {
        showErrorToast("End Date tidak bisa dibawah Start Date");
      } else {
        searchParams.set("start_date", startDate);
        searchParams.set("end_date", endDate);
      }
    }

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  const handleSetStatus = () => {
    if (deliveryStatus) {
      searchParams.set("status", deliveryStatus);
    } else {
      searchParams.delete("status");
    }

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // handleSetStartDate();
    // handleSetEndDate();
    handleSetPeriod();
    handleSetStatus();
  };

  useEffect(() => {
    const getDeliveryList = async () => {
      const startDateParam = searchParams.get("start_date");
      const endDateParam = searchParams.get("end_date");
      const statusParam = searchParams.get("status");

      const mappedStatus = {
        Success: "Y",
        Failed: "R",
      };

      const result = await fetchDeliveryStatus(
        startDateParam,
        endDateParam,
        mappedStatus[statusParam]
      );
      setDeliveryList(result);
      setIsLoading(false);
    };
    getDeliveryList();
  }, [searchParams]);

  const resendEmail = async (cif, startDate) => {
    console.log("Resending email to " + cif + " for date " + startDate);
    try {
      const year = parseInt(startDate.substring(0, 4), 10);
      const month = parseInt(startDate.substring(5, 7), 10) - 1;
      const date = new Date(year, month - 1);
      const adjustedYear = date.getFullYear();
      const adjustedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      const formattedDate = `${adjustedYear}-${adjustedMonth}`;

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sendEtax`,
        {
          cifs: [cif],
          startDate: formattedDate,
        }
      );

      if (response.data[cif] === "Email sent successfully") {
        showSuccessToast("Email sent successfully!");
      } else if (response.data[cif] === "Email already sent") {
        showErrorToast("Email already sent!");
      } else {
        showErrorToast("Unknown response from server.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showErrorToast("Failed to send email.");
    }
  };

  const resendAllEmails = async () => {
    setIsLoading(true);
    const failedDeliveries = deliveryList.filter(
      (delivery) => delivery.status === "R"
    );
    for (const delivery of failedDeliveries) {
      await resendEmail(delivery.cif, delivery.tanggalpembuatan);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col m-5">
      {isLoading && <CustomSpinner />}
      <h className="text-3xl mb-4 font-bold">Status Pengiriman</h>
      <form
        className="flex my-2 space-x-2 items-center"
        onSubmit={handleSearchSubmit}
      >
        <Box className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="start-date">
            Tanggal Awal
          </label>
          <input
            className="border rounded p-1"
            type="date"
            id="start-date"
            name="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Box>

        <Box className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="end-date">
            Tanggal Akhir
          </label>
          <input
            className="border rounded p-1"
            type="date"
            id="end-date"
            name="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Box>

        <Box>
          <Text className="font-semibold text-lg">Status</Text>
          <Select
            placeholder="Status"
            value={deliveryStatus}
            onChange={(e) => {
              const status = e.target.value;
              setDeliveryStatus(status);
            }}
          >
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Box>
        <button className="flex self-end border rounded py-2 px-2 bg-[#238FBA] hover:bg-[#263043] font-semibold text-white">
          Cari
        </button>
      </form>

      <div className="border rounded-md mb-4">
        <div className="flex flex-row bg-[#238FBA] border rounded-t-md p-2 text-white font-semibold justify-between">
          <h1 className="text-xl">Status Pengiriman</h1>
          <button
            className="px-2 py-1 rounded bg-[#263043] font-semibold text-white "
            onClick={resendAllEmails}
            disabled={isLoading}
          >
            {isLoading ? "Resending..." : "Kirim Ulang Semua"}
          </button>
        </div>

        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>CIF</Th>
                <Th>Email</Th>
                <Th>Tanggal</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {deliveryList.map((delivery) => (
                <Tr>
                  <Td>{delivery.no}</Td>
                  <Td>{delivery.cif}</Td>
                  <Td>{delivery.email}</Td>
                  <Td>{delivery.tanggalpembuatan}</Td>
                  <Td>
                    {delivery.status === "Y" ? (
                      <p className="text-green-600">Success</p>
                    ) : (
                      <p className="text-red-600">Failed</p>
                    )}
                  </Td>
                  <Td>
                    {delivery.status === "Y" ? (
                      <p className="text-green-600">Terkirim</p>
                    ) : (
                      <button
                        className="px-2 py-1 rounded bg-orange-500 hover:bg-orange-600 font-semibold text-white flex"
                        onClick={() =>
                          resendEmail(delivery.cif, delivery.tanggalpembuatan)
                        }
                      >
                        Kirim Ulang
                      </button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Status;

import { React, useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useCustomToast } from "../components/Toast";
import Select from "react-select";
import CustomSpinner from "../components/Spinner";
import { fetchAllNasabah } from "../apis/reportApi";
import { getLogPajakByCif } from "../apis/logPajakApi";

function Log() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cif, setCif] = useState("");
  const [logTax, setlogTax] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectCif = (selectedOption) => {
    const selectedClientId = selectedOption ? selectedOption.value : "";
    setSearchText(selectedClientId);
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
      setUsers(cifs);
      setIsLoading(false);
    };
    getAllNasabah();
  }, []);

  useEffect(() => {
    const getLogPajak = async () => {
      if (cif) {
        setIsLoading(true);
        const result = await getLogPajakByCif(cif);
        console.log(result);
        setlogTax(result);
        setIsLoading(false);
      }
    };
    getLogPajak();
  }, [cif]);

  return (
    <div className="flex flex-col m-5">
      {isLoading && <CustomSpinner />}
      <h className="text-3xl mb-4 font-bold">E-Tax Log</h>
      <form
        className="flex flex-row mb-4 space-x-3"
        onSubmit={handleSearchSubmit}
      >
        <Box className="flex gap-4 items-center justify-center">
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

      <div className="border rounded-md mb-4">
        <div className="flex flex-row bg-[#238FBA] border rounded-t-md p-2 text-white font-semibold ">
          <h1 className="text-xl">E-Tax Log</h1>
        </div>

        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>CIF</Th>
                <Th>Nama</Th>
                <Th>Nama File</Th>
                <Th>Email</Th>
                <Th>Tanggal Kirim</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {logTax.map((log, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{log.logCif}</Td>
                  <Td>{log.nasabahName}</Td>
                  <Td>{log.logPathPdf}</Td>
                  <Td>{log.nasabahEmail}</Td>
                  <Td>{log.logSendDate}</Td>
                  <Td>{log.logMessage}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Log;

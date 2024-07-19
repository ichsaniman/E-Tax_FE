import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  changeSchedulerGenerate,
  changeSchedulerSend,
  fetchSchedulerGenerate,
} from "../apis/schedulerApi";
import CustomSpinner from "../components/Spinner";
import { useCustomToast } from "../components/Toast";

function Scheduler() {
  const [currentSchedule, setCurrentSchedule] = useState("");
  const [tanggalGenerate, setTanggalGenerate] = useState("");
  const [jamGenerate, setJamGenerate] = useState("");
  const [tanggalSend, setTanggalSend] = useState("");
  const [jamSend, setJamSend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleChangeSchedule = async () => {
    setIsLoading(true);
    let partsGenerate = jamGenerate.split(":");
    let responseGenerate = await changeSchedulerGenerate(
      tanggalGenerate,
      partsGenerate[0],
      partsGenerate[1]
    );
    let partsSend = jamSend.split(":");
    let responseSend = await changeSchedulerSend(
      tanggalSend,
      partsSend[0],
      partsSend[1]
    );
    setIsLoading(false);
    if (!responseGenerate && !responseSend) {
      showErrorToast("Error");
    } else {
      showSuccessToast("Schedule changed successfully");
    }
  };

  useEffect(() => {
    const getScheduler = async () => {
      let response = await fetchSchedulerGenerate();
      let responseSplitted = response.split("\n");
      let jadwalGenerate = responseSplitted[0].split(" ");
      let jadwalSend = responseSplitted[1].split(" ");
      let hourGenerate = parseInt(jadwalGenerate[1], 10);
      hourGenerate = hourGenerate.toString().padStart(2, "0");
      let minuteGenerate = parseInt(jadwalGenerate[0], 10);
      minuteGenerate = minuteGenerate.toString().padStart(2, "0");
      let hourSend = parseInt(jadwalSend[1], 10);
      hourSend = hourSend.toString().padStart(2, "0");
      let minuteSend = parseInt(jadwalSend[0], 10);
      minuteSend = minuteSend.toString().padStart(2, "0");
      setTanggalGenerate(jadwalGenerate[2]);
      setJamGenerate(hourGenerate + ":" + minuteGenerate);
      setTanggalSend(jadwalSend[2]);
      setJamSend(hourSend + ":" + minuteSend);
    };
    getScheduler();
  }, []);

  return (
    <div className="flex flex-col m-6">
      {isLoading && <CustomSpinner />}
      <h className="text-3xl mb-6 font-bold">Jadwal</h>
      <div className="flex flex-col bg-[#263043] p-10 rounded-xl">
        <div className="flex flex-row space-x-10 mb-8">
          <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl mb-6 px-10 font-medium">Pembuatan</h2>
            <Text className="font-semibold text-lg">Tanggal</Text>
            <div className="">
              <input
                className="flex border rounded p-1 w-1/2"
                type="text"
                id="period"
                name="period"
                value={tanggalGenerate}
                onChange={(e) => setTanggalGenerate(e.target.value)}
              />
            </div>

            <Text className="font-semibold text-lg">Jam</Text>
            <div className="">
              <input
                className="border rounded px-4 focus:border-pink-500 focus:outline-none p-1"
                type="time"
                value={jamGenerate}
                onChange={(e) => setJamGenerate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl mb-6 px-10 font-medium">Pengiriman</h2>
            <Text className="font-semibold text-lg">Tanggal</Text>
            <div className="">
              <input
                className="flex border rounded p-1 w-1/2"
                type="text"
                id="period"
                name="period"
                value={tanggalSend}
                onChange={(e) => setTanggalSend(e.target.value)}
              />
            </div>

            <Text className="font-semibold text-lg">Jam</Text>
            <div className="">
              <input
                className="border rounded px-4 focus:border-pink-500 focus:outline-none p-1"
                type="time"
                value={jamSend}
                onChange={(e) => setJamSend(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-white border rounded p-2 text-[#263043] font-semibold inline-flex"
            onClick={(e) => handleChangeSchedule(e)}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scheduler;

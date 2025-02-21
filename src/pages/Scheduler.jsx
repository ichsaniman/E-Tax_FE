import React, { useEffect, useState, Suspense } from "react";
import {
  Text,
  Input,
  Flex,
  Button,
  Box,
  Stack,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Spinner,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  changeSchedulerGenerate,
  changeSchedulerSend,
  fetchSchedulerGenerate,
} from "../apis/schedulerApi";
import CustomSpinner from "../components/Spinner";
import { useCustomToast } from "../components/Toast";

function Scheduler() {
  const [tanggalGenerate, setTanggalGenerate] = useState("");
  const [jamGenerate, setJamGenerate] = useState("");
  const [tanggalSend, setTanggalSend] = useState("");
  const [jamSend, setJamSend] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    };
    getScheduler();
  }, []);

  return (
    <div className="flex flex-col m-6 w">
      {isLoading && <CustomSpinner />}
      <Text className="text-3xl mb-6 font-bold">Jadwal</Text>
      <Box width={"80"} bg={"white"} borderRadius={"lg"} boxShadow={"lg"} p={4}>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            gap={3}
            my={3}
          >
            <Tab color={"#6F777A"} _focus={{ color: "white", bg: "#27A0CF" }}>
              Generate
            </Tab>
            <Tab color={"#6F777A"} _focus={{ color: "white", bg: "#27A0CF" }}>
              Send
            </Tab>
          </TabList>

          <TabPanels m={0} p={0}>
            <TabPanel p={0}>
              <Suspense fallback={<Spinner size="xl" />}>
                <Box
                  color={"black"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"5em"}
                >
                  <Stack>
                    <FormControl>
                      <FormLabel>Tanggal</FormLabel>
                      <Input
                        className="flex border rounded p-1 w-1/2"
                        type="text"
                        id="period"
                        name="period"
                        value={tanggalSend}
                        onChange={(e) => setTanggalSend(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Jam</FormLabel>
                      <Input
                        className="border rounded px-4 focus:border-pink-500 focus:outline-none p-1"
                        type="time"
                        value={jamGenerate}
                        onChange={(e) => setJamGenerate(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Flex justifyContent={"flex-end"}>
                    <Button
                      onClick={(e) => handleChangeSchedule(e)}
                      bg={"#238FBA"}
                      borderRadius={"full"}
                      color={"white"}
                      w={"75px"}
                      h={"40px"}
                      _hover={{ bg: "cyan.900" }}
                      _active={{ bg: "#238FBA" }}
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              </Suspense>
            </TabPanel>

            <TabPanel p={0}>
              <Suspense fallback={<Spinner size="xl" />}>
                <Box
                  color={"black"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"5em"}
                >
                  <Stack>
                    <FormControl>
                      <FormLabel>Tanggal</FormLabel>
                      <Input
                        className="flex border rounded p-1 w-1/2"
                        type="text"
                        id="period"
                        name="period"
                        value={tanggalSend}
                        onChange={(e) => setTanggalSend(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Jam</FormLabel>
                      <Input
                        className="border rounded px-4 focus:border-pink-500 focus:outline-none p-1"
                        type="time"
                        value={jamSend}
                        onChange={(e) => setJamSend(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Flex justifyContent={"flex-end"}>
                    <Button
                      onClick={(e) => handleChangeSchedule(e)}
                      bg={"#238FBA"}
                      borderRadius={"full"}
                      color={"white"}
                      w={"75px"}
                      h={"40px"}
                      _hover={{ bg: "cyan.900" }}
                      _active={{ bg: "#238FBA" }}
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              </Suspense>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default Scheduler;

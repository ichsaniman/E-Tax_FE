import React from "react";
import {
  Card,
  Box,
  Stack,
  Button,
  Image,
  Select,
  Text,
  Flex,
  Grid,
  Icon,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash, FaAward, FaBriefcase } from "react-icons/fa";
import { BsFillArchiveFill } from "react-icons/bs";
import BarChart from "../components/BarChart";

function Home() {
  const taskData = [
    {
      label: "Total Generated",
      value: "total_projects_working_on_it",
      color: "#49a4e1",
      icon: FaBriefcase,
    },
    {
      label: "Total Sent",
      value: "total_projects_complete",
      color: "#00b533",
      icon: FaAward,
    },
  ];

  const PMPieData = [
    {
      name: "Tes1",
      data: 10,
    },
    {
      name: "Tes2",
      data: 20,
    },
    {
      name: "Tes3",
      data: 30,
    },
  ];
  return (
    <Flex direction="column" gap="4" className="main-container">
      <Text
        as="h2"
        fontSize={{ base: "xl", md: "3xl" }}
        fontWeight="600"
        color="black"
      >
        Dashboard
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={3}
        w="full"
      >
        {taskData.map(({ label, value, color, isClickable, icon }, index) => (
          <Box
            key={index}
            w="full"
            h="auto"
            bg="#fff"
            boxShadow="md"
            borderRadius="xl"
            border={`1px solid ${color}`}
            className={` ${isClickable ? "cursor-pointer" : ""}`}
            _hover={{ boxShadow: "xl", cursor: "pointer" }}
            // onClick={() => {
            //   if (accessPermissions.access_project) {
            //     window.location.href = "/project";
            //   }
            // }}
          >
            <Flex className="flex items-center gap-4 p-3">
              <Box borderRadius="full" bg={`${color}`} p="4">
                <Icon as={icon} boxSize={5} />
              </Box>
              <Flex direction="column">
                <Box borderRadius="full" bg={color} px="3" py="2">
                  <Text
                    fontSize="sm"
                    className={isClickable ? "text-white" : `text-[${color}]`}
                  >
                    {label}
                  </Text>
                </Box>
                <Text fontSize="3xl" className="text-black">
                  {/* {isLoading
                    ? "Loading..."
                    : dashboardData[value] != null
                    ? dashboardData[value]
                    : 0} */}
                  1000
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        // justifyContent={"space-between"}
        // alignItems={"center"}
        // gap={3}
        // bg="white"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        // w="full"
        // h="auto"
      >
        <Stack
          w={"full"}
          flex={1}
          alignItems={"left"}
          justifyContent={"center"}
        >
          <Text
            color={"black"}
            fontSize={["2xl", "2xl", "3xl", "3xl", "3xl"]}
            fontWeight={"600"}
          >
            Rekap Bulanan
          </Text>
        </Stack>
        <Box w={"full"} h={"full"} flex={3}>
          <BarChart data={PMPieData} height={"100%"} width={"100%"} />
        </Box>
      </Box>
    </Flex>
  );
}

export default Home;

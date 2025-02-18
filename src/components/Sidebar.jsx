import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosSpeedometer, IoIosLogOut } from "react-icons/io";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import {
  FaBusinessTime,
  FaUsers,
  FaChalkboardUser,
  FaBriefcase,
  FaGear,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { FaHourglass, FaChartBar } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { RiFileList3Fill, RiListSettingsLine } from "react-icons/ri";
import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Text,
  Image,
  Icon,
  Box,
  Link,
  Collapse,
} from "@chakra-ui/react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
// import LogoKT from "../../assets/logoKT - gray.png";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const roleId = localStorage.getItem("role_id");
  const companyId = localStorage.getItem("company_id");
  const accessData = localStorage.getItem("access_permissions")
    ? JSON.parse(localStorage.getItem("access_permissions"))
    : {};

  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the state of the submenu
    }));
  };

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  useEffect(() => {
    const handlePageChange = () => {
      localStorage.removeItem("selectedContentType");
    };

    document.querySelectorAll(".sidebar-list-item a").forEach((link) => {
      link.addEventListener("click", handlePageChange);
    });

    return () => {
      document.querySelectorAll(".sidebar-list-item a").forEach((link) => {
        link.removeEventListener("click", handlePageChange);
      });
    };
  }, []);

  const listItems = [
    {
      href: "/home",
      icon: IoIosSpeedometer,
      text: "Home",
      access: accessData.access_dashboard,
    },
    // {
    //   href: "#",
    //   icon: HiOutlineClipboardDocumentList,
    //   text: "Tugas Saya",
    //   access: accessData.access_tasks || accessData.access_adhoc_tasks,
    //   subItems: [
    //     {
    //       href: "/pending-task",
    //       icon: FaTasks,
    //       text: "Tugas Aktif",
    //       access: accessData.access_tasks,
    //     },
    //     {
    //       href: "/log-history",
    //       icon: FaBusinessTime,
    //       text: "Riwayat Tugas",
    //       access: true,
    //     },
    //   ],
    // },
    // {
    //   href: "#",
    //   icon: FaBriefcase,
    //   text: "Projek dan Tugas",
    //   access: accessData.access_tasks || accessData.access_adhoc_tasks,
    //   subItems: [
    //     {
    //       href: "/project",
    //       icon: RiFileList3Fill,
    //       text: "Kelola Projek",
    //       access: accessData.access_project,
    //     },
    //     {
    //       href: "/task-adhoc",
    //       icon: RiListSettingsLine,
    //       text: "Kelola Tugas Harian",
    //       access: accessData.access_adhoc_tasks,
    //     },
    //   ],
    // },
    // {
    //   href: "/attendance",
    //   icon: FaChalkboardUser,
    //   text: "Report",
    //   access: accessData.access_attendance,
    // },
    // ...(companyId == 19
    //   ? [
    //       {
    //         href: "/management-sales",
    //         icon: MdManageAccounts,
    //         text: "Manajemen Sales",
    //         access: accessData.access_sales_management,
    //       },
    //       {
    //         href: "/reimbursement",
    //         icon: FaMoneyBillWave,
    //         text: "Klaim",
    //         access: true,
    //       },
    //     ]
    //   : []),
    {
      href: "/laporan",
      icon: IoDocuments,
      text: "Report",
      access: accessData.access_update_document_archive,
    },
    {
      href: "/status",
      icon: FaUsers,
      text: "Status",
      access: accessData.access_manage_user,
    },
    // {
    //   href: "/jadwal",
    //   icon: FaChartBar,
    //   text: "Scheduler",
    //   access: accessData.access_performance_karyawan,
    // },
    // ...(companyId == 19
    //   ? [
    //       {
    //         href: "/scheduler",
    //         icon: MdOutlineDateRange,
    //         text: "Scheduler",
    //         access: accessData.access_project_report,
    //       },
    //     ]
    //   : []),
    {
      href: "/jadwal",
      icon: FaGear,
      text: "Scheduler",
      access: accessData.access_settings,
    },
  ];

  return (
    <aside
      id="sidebar"
      className={`${
        openSidebarToggle ? "sidebar-responsive" : ""
      } h-full flex flex-col`}
    >
      <Box display={{ base: "block" }} className="sidebar-title">
        <Icon
          display={{ base: "block", lg: "none" }}
          as={BsFillArrowLeftSquareFill}
          onClick={OpenSidebar}
          boxSize={5}
        />
      </Box>
      <List spacing={1} mx="2">
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            p="7px"
            // justifyItems="center"
            m="0 2 2 2"
            borderRadius="full"
            className={`sidebar-list-item ${
              isActiveLink(item.href) ? "active" : ""
            } ${item.subItems ? "has-submenu" : ""}`}
          >
            {item.subItems ? (
              <Box>
                <Flex
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => toggleSubmenu(index)}
                  className="text-md text-white"
                >
                  <ListIcon as={item.icon} color="white" fontSize="sm" />
                  <Text fontSize="sm">{item.text}</Text>
                  <Icon
                    as={openSubmenus[index] ? FaChevronUp : FaChevronDown}
                    ml="auto"
                    fontSize="sm"
                  />
                </Flex>
                <Collapse in={openSubmenus[index]}>
                  <List mt={2} ml={4} spacing={1}>
                    {item.subItems.map(
                      (subItem, subIndex) =>
                        subItem.access && (
                          <ListItem
                            key={`${index}-${subIndex}`}
                            p="5px"
                            borderRadius="full"
                            className={`sidebar-list-item ${
                              isActiveLink(subItem.href) ? "active" : ""
                            }`}
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-center text-sm text-white"
                            >
                              <ListIcon
                                as={subItem.icon}
                                color="white"
                                fontSize="sm"
                              />
                              <Text fontSize="sm">{subItem.text}</Text>
                            </Link>
                          </ListItem>
                        )
                    )}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <Link
                href={item.href}
                className="flex items-center text-md text-white"
              >
                <ListIcon as={item.icon} color="white" fontSize="sm" />
                <Text fontSize="sm">{item.text}</Text>
              </Link>
            )}
          </ListItem>
        ))}
      </List>

      <Box
        mt="auto"
        p={3}
        display={"flex"}
        flexDirection={"row"}
        gap={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* <Text fontSize={"10px"} fontWeight={"400"} color={"white"}>
          Powered By Ichsan
        </Text> */}
        {/* <Link href="https://kejartugas.com">
          <Image src={LogoKT} h={{ base: "3vh", md: "6vh" }} alt="Logo" />
        </Link> */}
      </Box>
    </aside>
  );
}

export default Sidebar;

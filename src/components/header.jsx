import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  Image,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Flex,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  HStack,
  Badge,
  IconButton,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
// import LogoKT from "../../assets/logoKT - transparent.png";
// import LogoKTSymbol from "../../assets/logoKT - Symbol.png";
import LogoInnovation from "../assets/logo-innovation.png";
// import ProjectContext from "../../context/ProjectContext";
import axios from "axios";
// import useNotifications from "../../hooks/notificationServic";

// Icons
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiLogoutBoxLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { BsBell } from "react-icons/bs";
import {
  IoCheckmarkDoneCircleOutline,
  IoTimeOutline,
  IoCreateOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";

const NOTIFICATION_CONFIGS = {
  new_task_notif: {
    icon: IoCreateOutline,
    color: "blue",
    title: "New Task Assignment",
    path: "/pending-task",
    tabType: "pending",
  },
  submit_task_notif: {
    icon: MdOutlineAssignment,
    color: "orange",
    title: "Task Submitted",
    path: "/project",
    tabType: "on-review",
  },
  approve_task_notif: {
    icon: IoCheckmarkDoneCircleOutline,
    color: "green",
    title: "Task Approved",
    path: "/pending-task",
    tabType: "completed",
  },
  reject_task_notif: {
    icon: IoTimeOutline,
    color: "red",
    title: "Task Rejected",
    path: "/pending-task",
    tabType: "rejected",
  },
  hold_task_notif: {
    icon: IoTimeOutline,
    color: "purple",
    title: "Task Hold",
    path: "/pending-task",
    tabType: "on-hold",
  },
};

// Updated NotificationItem component
const NotificationItem = ({ notification, onRead, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const config = NOTIFICATION_CONFIGS[notification.notif_type] || {
    icon: IoTimeOutline,
    color: "gray",
    title: "Notification",
    path: "/",
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!notification.is_read) {
        await onRead(notification.id);
      }
      onNavigate(notification);
    } catch (error) {
      console.error("Error handling notification click:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  return (
    <Box
      p={3}
      cursor={isLoading ? "wait" : "pointer"}
      borderRadius="md"
      transition="all 0.2s"
      bg={notification.is_read ? "white" : "blue.50"}
      _hover={{ bg: "gray.50" }}
      onClick={handleClick}
      opacity={isLoading ? 0.7 : 1}
      position="relative"
    >
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="whiteAlpha.800"
          borderRadius="md"
          zIndex={1}
        >
          <Spinner size="sm" color="blue.500" />
        </Box>
      )}

      <HStack spacing={3} align="start">
        <Icon as={config.icon} boxSize={6} color={`${config.color}.500`} />
        <VStack align="start" flex={1} spacing={1}>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="medium" fontSize="sm">
              {config.title}
            </Text>
            {!notification.is_read && (
              <Badge colorScheme="blue" variant="solid" borderRadius="full">
                New
              </Badge>
            )}
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="xs" fontWeight="medium" color="gray.500">
              {notification.task_name}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {notification.message}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatTimeAgo(notification.created_at)}
          </Text>
        </VStack>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<IoEllipsisVertical />}
            variant="ghost"
            size="sm"
            aria-label="Notification options"
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList onClick={(e) => e.stopPropagation()}>
            {!notification.is_read && (
              <MenuItem
                onClick={() => onRead(notification.id)}
                isDisabled={isLoading}
              >
                Mark as read
              </MenuItem>
            )}
            <MenuItem
              onClick={() => onNavigate(notification)}
              isDisabled={isLoading}
            >
              View details
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

function Header({ OpenSidebar }) {
  // const { company } = useContext(ProjectContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = localStorage.getItem("username");
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const employeeId = localStorage.getItem("id");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const roleId = localStorage.getItem("role_id");
  const CompanyLogo = localStorage.getItem("companyImage");
  const profilePicture = localStorage.getItem("profile_picture");
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("company_id");
  const toast = useToast();

  // Use the notifications hook
  // const {
  //   notifications,
  //   isLoading,
  //   error,
  //   fetchNotifications,
  //   markAsRead,
  //   markAllAsRead,
  //   unreadCount,
  // } = useNotifications();

  // const fetchData = async () => {
  //   await fetchNotifications(employeeId);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [employeeId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle notification navigation
  const handleNotificationNavigation = useCallback((notification) => {
    const config = NOTIFICATION_CONFIGS[notification.notif_type];
    if (config) {
      // Store the tab selection before navigation
      localStorage.setItem("selectedContentType", config.tabType);
      // Navigate to the appropriate path
      window.location.href = config.path;
    }
  }, []);

  // Handle mark as read with toast feedback
  // const handleMarkAsRead = useCallback(
  //   async (notificationId) => {
  //     try {
  //       await markAsRead(notificationId);
  //       toast({
  //         title: "Success",
  //         description: "Notification marked as read",
  //         status: "success",
  //         duration: 2000,
  //       });
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Failed to mark notification as read",
  //         status: "error",
  //         duration: 3000,
  //       });
  //     } finally {
  //       fetchData(); // Fetch notifications after marking as read
  //     }
  //   },
  //   [markAsRead, toast]
  // );

  // Handle mark all as read
  // const handleMarkAllAsRead = useCallback(async () => {
  //   try {
  //     await markAllAsRead(employeeId);
  //     toast({
  //       title: "Success",
  //       description: "All notifications marked as read",
  //       status: "success",
  //       duration: 2000,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to mark all notifications as read",
  //       status: "error",
  //       duration: 3000,
  //     });
  //   }
  // }, [markAllAsRead, employeeId, toast]);

  const logoutSubmit = async () => {
    try {
      // Clear token and status from localStorage
      localStorage.clear();
      // Redirect to the home page after successful logout
      window.location.href = "/";
    } catch (error) {
      console.error("There was an error during logout:", error);
      // Handle error, show error message, or perform any other action
    }
  };

  const handleMenuClick = (action) => {
    if (action === "logout") {
      handleLogout();
    } else if (action === "changePass") {
      handleChangePass();
    } else if (action === "profile") {
      handleProfile();
    } else if (action === "companyProfile") {
      handleCompanyProfile();
    }
  };

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure want to \n Log Out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            logoutSubmit();
            setLoading(false); // Set loading state to false after logout operation completes
          }, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setLoading(false); // Set loading state to false if user cancels the operation
        }
      });
  };

  const handleProfile = () => {
    const url = `/profile/${employeeId}`;
    window.location.href = url;
  };

  const handleCompanyProfile = () => {
    const url = `/company/${companyId}`;
    window.location.href = url;
  };

  const handleChangePass = () => {
    setShowModal(true);
  };

  return (
    <Box
      style={{
        padding: "12px 30px 12px 30px",
        boxShadow: "0 6px 7px -3px rgba(0, 0, 0, 0.35)",
      }}
      display={"flex"}
      alignItems={"center"}
      className="header d-flex z-100 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5"
    >
      <div className="menu-icon">
        <BsJustify
          className="icon w-5 h-5 text-blue-600"
          onClick={OpenSidebar}
          // onClick={onOpen}
        />
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>{/* <Input placeholder='Type here...' /> */}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* Logo */}
      <Box className="header-left" alignItems={"center"}>
        <a href="/home">
          <Image
            src={LogoInnovation}
            h={{ base: "4vh", md: "6vh", lg: "6vh", xl: "8vh" }}
            // alt={company.company_name}
          />
        </a>
      </Box>
      <Flex alignItems={"center"} gap={3} className="header-right">
        {/* Notification Popover */}

        {/* Profile Dropdown */}
        <Flex direction={"row"} alignItems="center" gap={3}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="transparent"
              color="#238FBA"
              borderColor="#238FBA"
              border={{ base: 0, md: "2px" }}
              borderRadius="full"
              p={{ base: 0, sm: 6 }}
              _hover={{ color: "#1a6d8e" }}
              _active={{ color: "#1a6d8e" }}
            >
              <Flex direction="row" alignItems="center" gap="3">
                {/* <Icon as={FaUserCircle} boxSize={{ base: 7, md: 6 }} /> */}
                <Avatar
                  border={"1px"}
                  borderColor={"blue.800"}
                  src={
                    profilePicture
                      ? `${process.env.REACT_APP_API_URL}/${profilePicture}`
                      : "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png"
                  }
                  w={8}
                  h={8}
                />
                {/* Use Chakra UI's responsive display for the Text component */}
                <Text
                  display={["none", "none", "block"]}
                  fontWeight="400"
                  fontSize="md"
                >
                  Demo{user}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<GoPeople />}
                onClick={() => handleMenuClick("profile")}
              >
                Profil
              </MenuItem>
              {roleId == 2 && (
                <>
                  <MenuItem
                    icon={<HiOutlineBuildingOffice2 />}
                    onClick={() => handleMenuClick("companyProfile")}
                  >
                    Perusahaan Saya
                  </MenuItem>
                  <MenuDivider />
                </>
              )}

              {/* <MenuItem>
              Help
              </MenuItem> */}
              <MenuItem
                icon={<RiLogoutBoxLine />}
                onClick={() => handleMenuClick("logout")}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;

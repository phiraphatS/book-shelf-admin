import React from 'react'
import { Box, Flex, VStack, IconButton, Text, List, ListItem, useToast, useDisclosure } from "@chakra-ui/react"
import { InfoIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MenuItem = ({ children, isActive = false, onClick }: { children: React.ReactNode, isActive: boolean, onClick?: () => void }) => (
  <ListItem
    cursor="pointer"
    py={2}
    px={4}
    _hover={{ bg: 'rgba(255, 255, 255, 0.1)', transform: 'translateX(5px)' }}
    transition="all 0.2s"
    bg={isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
    fontWeight={isActive ? 'bold' : 'normal'}
    onClick={onClick}
  >
    {children}
  </ListItem>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const router = useRouter();
  const toast = useToast();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/auth/signin');
      toast({
        title: "Signed out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={{ base: "column", lg: "row" }} minHeight="100vh">
      <Box
        bg="#26A69A"
        width={{ base: "240px", lg: "240px" }}
        height={{ base: "100vh", lg: "auto" }}
        color="white"
        py={6}
        px={4}
        position={{ base: "fixed", lg: "static" }}
        top="0"
        left="0"
        zIndex="1001"
        transform={{ base: isOpen ? "translateX(0)" : "translateX(-240px)", lg: "translateX(0)" }}
        transition="transform 0.3s"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">Bookstore</Text>
          <IconButton
            aria-label="Close menu"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={onClose}
            display={{ base: "flex", lg: "none" }}
          />
        </Flex>
        <VStack align="stretch" spacing={6}>
          <Flex alignItems="center" mb={6} bg="white" borderRadius="full" py={2} px={4}>
            <Box as={InfoIcon} color="#26A69A" mr={2} />
            <Text color="#26A69A" fontWeight="bold">Inbox</Text>
            <Text color="#26A69A" fontWeight="bold" ml="auto">24</Text>
          </Flex>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Categories</Text>
            <List spacing={2}>
              {["All", "Horror", "Romance", "crime", "Fantasy", "History"].map((category, index) => (
                <MenuItem key={category} isActive={index === 0}>{category}</MenuItem>
              ))}
            </List>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Customer</Text>
            {/* Add customer-related items here if needed */}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Profile</Text>
            <List>
              <MenuItem isActive={false} onClick={handleSignOut}>Logout</MenuItem>
            </List>
          </Box>
        </VStack>
      </Box>
      <Box flex={1} overflowY="auto">
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onClose}
          display={{ base: "flex", lg: "none" }}
          position="absolute"
          top={4}
          left={4}
        />
      </Box>
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.400"
          zIndex="1000"
          display={{ base: "block", lg: "none" }}
          onClick={onClose}
        />
      )}
    </Flex>
  );
};

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <Flex direction={{ base: "column", lg: "row" }} minHeight="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box flex={1} overflowY="auto">

        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onToggle}
          display={{ base: "flex", lg: "none" }}
        />
        {/* <Header onToggleSidebar={onToggle} /> */}
        <Box p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
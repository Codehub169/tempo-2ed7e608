import React from 'react';
import {
  Box,
  Flex,
  // Heading, // Kept for potential use elsewhere, but logo is now an Image. Removed from this file as Image is used.
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  // Spacer, // Removed as it's not used
  Image // Ensure Image is imported
} from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// Header component for site navigation and branding
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for mobile menu toggle
  const location = useLocation();

  // Navigation links configuration
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Donate', path: '/donate' },
    { label: 'Contact', path: '/contact' },
  ];

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Define logo element to reuse
  const Logo = () => (
    <Image src="/logo-hopeharbor.svg" alt="HopeHarbor Logo" h={{ base: '32px', md: '40px' }} fallbackSrc="https://via.placeholder.com/150x40?text=HopeHarbor" />
  );

  return (
    <Box
      as="header"
      bg="white"
      py={4}
      px={{ base: 4, md: 6 }}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky" // Chakra's zIndex scale can be used, or a specific number like 1100 for sticky headers
    >
      <Flex alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        {/* Logo */}
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        {/* Desktop Navigation */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <ChakraLink
              key={item.label}
              as={RouterLink}
              to={item.path}
              fontFamily="primary"
              fontWeight={isActive(item.path) ? 'bold' : 'medium'}
              fontSize="md"
              color={isActive(item.path) ? 'primary.default' : 'neutral.textBase'} // Updated to use neutral.textBase from theme for consistency
              pb={1}
              borderBottomWidth={isActive(item.path) ? '2px' : '0'}
              borderColor="primary.default"
              _hover={{
                textDecoration: 'none',
                color: 'primary.dark',
                borderBottomColor: 'primary.dark',
              }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </HStack>

        {/* Mobile Menu Toggle */}
        <IconButton
          aria-label="Open navigation menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: 'flex', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          colorScheme="primary"
        />
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {/* Logo in Drawer */}
            <RouterLink to="/" onClick={onClose}> {/* Added onClick={onClose} to logo in drawer for better UX */}
              <Logo />
            </RouterLink>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <ChakraLink
                  key={item.label}
                  as={RouterLink}
                  to={item.path}
                  onClick={onClose} // Close drawer on link click
                  fontFamily="primary"
                  fontWeight={isActive(item.path) ? 'bold' : 'medium'}
                  fontSize="lg"
                  textAlign="left"
                  w="full"
                  p={2}
                  borderRadius="md"
                  bg={isActive(item.path) ? 'primary.light' : 'transparent'}
                  color={isActive(item.path) ? 'primary.default' : 'neutral.textBase'} // Updated to use neutral.textBase
                  _hover={{
                    textDecoration: 'none',
                    bg: 'primary.light',
                    color: 'primary.dark',
                  }}
                >
                  {item.label}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;

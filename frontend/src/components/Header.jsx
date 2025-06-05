import React from 'react';
import {
  Box,
  Flex,
  Heading,
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
  Spacer,
  Image
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

  return (
    <Box
      as="header"
      bg="white"
      py={4}
      px={{ base: 4, md: 6 }}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        {/* Logo */}
        <RouterLink to="/">
          <Heading as="h1" size="lg" color="primary.default" fontFamily="primary">
            Hope<Box as="span" color="secondary.default">Harbor</Box>
          </Heading>
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
              color={isActive(item.path) ? 'primary.default' : 'text.base'}
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
            <Heading as="h2" size="md" color="primary.default" fontFamily="primary">
              Hope<Box as="span" color="secondary.default">Harbor</Box>
            </Heading>
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
                  color={isActive(item.path) ? 'primary.default' : 'text.base'}
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

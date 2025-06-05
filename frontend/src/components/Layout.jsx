import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer'; // Assuming Footer will be created

// Layout component provides the basic structure for all pages
// It includes the Header, Footer, and a main content area for page-specific components
const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      {/* Main content area where page components will be rendered */}
      <Box as="main" flexGrow={1} py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;

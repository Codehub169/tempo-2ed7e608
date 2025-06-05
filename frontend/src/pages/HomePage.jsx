import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon, // Grid, GridItem, Image removed as they are not directly used here
  Container,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Flex
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHandHoldingHeart, FaLeaf, FaArrowRight } from 'react-icons/fa'; 
import { fetchCauses } from '@/services/api';
import CauseListItem from '@/components/CauseListItem';

const HomePage = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCauses = async () => {
      try {
        setLoading(true);
        const data = await fetchCauses();
        setCauses(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch causes.');
        console.error('Error fetching causes:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCauses();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgImage="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
        bgSize="cover"
        bgPosition="center"
        color="white"
        py={{ base: '20', md: '40' }}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Heading as="h1" size={{base: '2xl', md: '4xl'}} fontWeight="extrabold" mb={4} fontFamily="primary">
            Your Contribution, Their Future.
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="700px" mx="auto" mb={8} fontFamily="secondary">
            Join us in making a tangible difference. Support causes that uplift communities, protect our planet, and spread hope where it's needed most.
          </Text>
          <HStack spacing={4} justify="center">
            <Button as={RouterLink} to="#causes-section" colorScheme="primary" size="lg" fontWeight="bold" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}>
              Explore Causes
            </Button>
            <Button as={RouterLink} to="/donate" colorScheme="secondary" size="lg" fontWeight="bold" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}>
              Donate Now
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Causes Section */}
      <Box id="causes-section" py={{ base: 16, md: 20 }} bg="neutral.light">
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="2xl" fontFamily="primary">Support a Cause</Heading>
            <Text fontSize="lg" color="neutral.textMuted" maxW="600px" mx="auto" fontFamily="secondary">
              Every donation, big or small, contributes to meaningful change. Find a cause that resonates with you and help us make an impact.
            </Text>
          </VStack>
          {loading && (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" color="primary.default" thickness="4px" speed="0.65s" emptyColor="gray.200" />
            </Flex>
          )}
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text>{error}</Text>
            </Alert>
          )}
          {!loading && !error && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {causes.map((cause) => (
                <CauseListItem key={cause.id} cause={cause} />
              ))}
            </SimpleGrid>
          )}
          {!loading && !error && causes.length === 0 && (
             <Text textAlign="center" fontSize="lg" color="neutral.textMuted">No causes available at the moment. Please check back later.</Text>
          )}
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={{ base: 16, md: 20 }}>
        <Container maxW="container.lg">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="2xl" fontFamily="primary">How Your Donation Helps</Heading>
            <Text fontSize="lg" color="neutral.textMuted" maxW="600px" mx="auto" fontFamily="secondary">
              We ensure your contributions are used effectively to create lasting impact.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
            <VStack spacing={4} p={6}>
              <Icon as={FaHandHoldingHeart} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" />
              <Heading as="h3" size="lg" fontFamily="primary">Choose a Cause</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">Browse our curated list of impactful projects and select one that speaks to you.</Text>
            </VStack>
            <VStack spacing={4} p={6}>
              <Icon as={FaArrowRight} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" /> 
              <Heading as="h3" size="lg" fontFamily="primary">Make a Donation</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">Securely contribute any amount. Every bit helps make a difference.</Text>
            </VStack>
            <VStack spacing={4} p={6}>
              <Icon as={FaLeaf} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" />
              <Heading as="h3" size="lg" fontFamily="primary">See The Impact</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">Receive updates on how your generosity is changing lives and communities.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

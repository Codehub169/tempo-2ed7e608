import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Grid, GridItem, Image, Icon, Container, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// Placeholder icons - replace with actual icons from a library like react-icons
import { FaHandHoldingHeart, FaLeaf, FaTint, FaArrowRight } from 'react-icons/fa'; 

// Sample cause data (will be replaced by API call)
const sampleCauses = [
  {
    id: 'education',
    title: 'Educate a Child',
    description: 'Provide access to quality education for underprivileged children, empowering them for a brighter future.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    raised: 7500,
    goal: 10000,
  },
  {
    id: 'environment',
    title: 'Protect Our Planet',
    description: 'Support initiatives focused on reforestation, wildlife conservation, and combating climate change.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80',
    raised: 12000,
    goal: 20000,
  },
  {
    id: 'water',
    title: 'Clean Water for All',
    description: 'Help provide access to clean and safe drinking water for communities in need around the world.',
    image: 'https://images.unsplash.com/photo-1518398046578-8CCA57782e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    raised: 4500,
    goal: 5000,
  },
];

const HomePage = () => {
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
            <Text fontSize="lg" color="text.muted" maxW="600px" mx="auto" fontFamily="secondary">
              Every donation, big or small, contributes to meaningful change. Find a cause that resonates with you and help us make an impact.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {sampleCauses.map((cause) => (
              <GridItem key={cause.id} bg="white" borderRadius="lg" boxShadow="md" overflow="hidden" transition="all 0.3s" _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}>
                <Image src={cause.image} alt={cause.title} w="100%" h="200px" objectFit="cover" />
                <Box p={6} d="flex" flexDirection="column" flexGrow={1}>
                  <Heading as="h3" size="lg" fontFamily="primary" mb={2}>{cause.title}</Heading>
                  <Text fontSize="md" color="text.muted" mb={4} flexGrow={1} fontFamily="secondary">{cause.description}</Text>
                  <Box w="100%" bg="gray.200" borderRadius="md" h="8px" mb={2} overflow="hidden">
                    <Box bg="secondary.default" h="100%" w={`${(cause.raised / cause.goal) * 100}%`} />
                  </Box>
                  <HStack justifyContent="space-between" fontSize="sm" color="text.muted" mb={4}>
                    <Text fontWeight="bold" color="text.dark">${cause.raised.toLocaleString()} <Text as="span" fontWeight="normal">Raised</Text></Text>
                    <Text>${cause.goal.toLocaleString()} <Text as="span" fontWeight="normal">Goal</Text></Text>
                  </HStack>
                  <Button as={RouterLink} to={`/donate/${cause.id}`} colorScheme="primary" w="100%" fontWeight="bold">
                    Donate Now
                  </Button>
                </Box>
              </GridItem>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={{ base: 16, md: 20 }}>
        <Container maxW="container.lg">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="2xl" fontFamily="primary">How Your Donation Helps</Heading>
            <Text fontSize="lg" color="text.muted" maxW="600px" mx="auto" fontFamily="secondary">
              We ensure your contributions are used effectively to create lasting impact.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
            <VStack spacing={4} p={6}>
              <Icon as={FaHandHoldingHeart} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" />
              <Heading as="h3" size="lg" fontFamily="primary">Choose a Cause</Heading>
              <Text color="text.muted" fontFamily="secondary">Browse our curated list of impactful projects and select one that speaks to you.</Text>
            </VStack>
            <VStack spacing={4} p={6}>
              <Icon as={FaArrowRight} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" /> 
              <Heading as="h3" size="lg" fontFamily="primary">Make a Donation</Heading>
              <Text color="text.muted" fontFamily="secondary">Securely contribute any amount. Every bit helps make a difference.</Text>
            </VStack>
            <VStack spacing={4} p={6}>
              <Icon as={FaLeaf} w={16} h={16} color="primary.default" p={3} bg="primary.light" borderRadius="full" />
              <Heading as="h3" size="lg" fontFamily="primary">See The Impact</Heading>
              <Text color="text.muted" fontFamily="secondary">Receive updates on how your generosity is changing lives and communities.</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

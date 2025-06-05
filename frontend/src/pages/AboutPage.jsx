import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  Icon,
  Flex // Flex was not used, but kept in case of future minor layout adjustments within this structure.
} from '@chakra-ui/react';
import { FaUsers, FaHeart, FaBullseye } from 'react-icons/fa'; // Example icons

const AboutPage = () => {
  return (
    <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} fontFamily="primary" color="neutral.dark">
            About HopeHarbor
          </Heading>
          <Text fontSize="lg" color="neutral.textMuted" maxW="700px" mx="auto">
            HopeHarbor is dedicated to connecting generous hearts with impactful causes. We believe in transparency, efficiency, and the power of collective action to make a positive change in the world.
          </Text>
        </Box>

        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          alt="Community working together"
          borderRadius="lg"
          boxShadow="lg"
          objectFit="cover"
          maxH={{ base: '250px', md: '400px' }}
          w="100%"
          mb={8}
          fallbackSrc="https://via.placeholder.com/1374x400?text=Community+Working+Together"
        />

        <Box>
          <Heading as="h2" size="xl" fontFamily="primary" color="primary.default" mb={6} textAlign="center">
            Our Mission & Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
            <VStack spacing={4} p={5} bg="neutral.light" borderRadius="md" boxShadow="sm">
              <Icon as={FaHeart} w={12} h={12} color="secondary.default" />
              <Heading as="h3" size="lg" fontFamily="primary">Compassion</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">
                We operate with a deep sense of compassion for those in need and strive to foster a community of empathy and support.
              </Text>
            </VStack>
            <VStack spacing={4} p={5} bg="neutral.light" borderRadius="md" boxShadow="sm">
              <Icon as={FaBullseye} w={12} h={12} color="accent.default" />
              <Heading as="h3" size="lg" fontFamily="primary">Impact</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">
                Our focus is on creating tangible, lasting impact by supporting effective programs and initiatives.
              </Text>
            </VStack>
            <VStack spacing={4} p={5} bg="neutral.light" borderRadius="md" boxShadow="sm">
              <Icon as={FaUsers} w={12} h={12} color="primary.default" />
              <Heading as="h3" size="lg" fontFamily="primary">Collaboration</Heading>
              <Text color="neutral.textMuted" fontFamily="secondary">
                We believe in the power of collaboration, working with donors, organizations, and communities to achieve common goals.
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        <Box mt={10} p={8} bg="primary.light" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" fontFamily="primary" color="primary.dark" mb={4} textAlign="center">
            Join Us in Making a Difference
          </Heading>
          <Text fontSize="md" color="neutral.textBase" textAlign="center">
            Whether you are a donor, a volunteer, or an organization looking to partner, there are many ways to get involved with HopeHarbor. Together, we can spread hope and create a better future for all.
          </Text>
        </Box>

      </VStack>
    </Container>
  );
};

export default AboutPage;

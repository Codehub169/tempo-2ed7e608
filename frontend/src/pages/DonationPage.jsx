import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  ButtonGroup,
  Image,
  useToast,
  FormErrorMessage,
  Icon,
  Flex,
  SimpleGrid
} from '@chakra-ui/react';
import { FaCreditCard, FaPaypal, FaApple } from 'react-icons/fa'; // Example payment icons

// Sample cause data (replace with API call later)
const sampleCauses = {
  education: {
    id: 'education',
    title: 'Educate a Child Fund',
    description: 'Your contribution will help provide books, school supplies, and tuition support for children in underserved communities, opening doors to a brighter future.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  environment: {
    id: 'environment',
    title: 'Protect Our Planet Initiative',
    description: 'Support vital conservation efforts, including reforestation projects, wildlife protection programs, and initiatives to combat climate change and preserve biodiversity.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80',
  },
  water: {
    id: 'water',
    title: 'Clean Water Access Project',
    description: 'Help us bring clean and safe drinking water to communities lacking this basic necessity. Your donation funds wells, filtration systems, and hygiene education.',
    image: 'https://images.unsplash.com/photo-1518398046578-8CCA57782e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  general: {
    id: 'general',
    title: 'Support Our General Fund',
    description: 'Your donation to our general fund allows us to direct resources where they are most needed, responding to urgent priorities and supporting a wide range of impactful projects.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  }
};

// DonationPage component for handling donations
const DonationPage = () => {
  const { causeId } = useParams(); // Get causeId from URL if present
  const navigate = useNavigate();
  const toast = useToast();

  // State for form inputs and selected cause
  const [selectedCause, setSelectedCause] = useState(sampleCauses.general);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-defined donation amounts
  const presetAmounts = [25, 50, 100, 250];

  // Effect to update selected cause when causeId changes
  useEffect(() => {
    if (causeId && sampleCauses[causeId]) {
      setSelectedCause(sampleCauses[causeId]);
    } else if (causeId) {
      // Handle invalid causeId, e.g., navigate to a 404 page or show general fund
      navigate('/donate'); // Redirect to general donation page or show an error
      toast({
        title: 'Cause not found.',
        description: `The cause '${causeId}' does not exist. Please choose another cause or donate to our general fund.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [causeId, navigate, toast]);

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid donation amount.';
    }
    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call for donation processing
      console.log('Donation submitted:', { cause: selectedCause.title, amount, name, email });
      setFormSubmitted(true);
      toast({
        title: 'Donation Submitted!',
        description: 'Thank you for your generous contribution.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Reset form or redirect as needed
      // setAmount(''); setName(''); setEmail(''); setErrors({});
    }
  };

  if (formSubmitted) {
    return (
      <Container maxW="container.md" py={10} textAlign="center">
        <Box bg="secondary.light" p={10} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="xl" color="secondary.dark" mb={4} fontFamily="primary">
            Thank You For Your Generosity!
          </Heading>
          <Text fontSize="lg" color="text.base" mb={6}>
            Your donation to <strong>{selectedCause.title}</strong> has been processed successfully.
            A confirmation email will be sent to <strong>{email}</strong> shortly.
          </Text>
          <Button colorScheme="primary" onClick={() => navigate('/')} size="lg">
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} fontFamily="primary" color="text.dark">
            Make a Donation
          </Heading>
          <Text fontSize="lg" color="text.muted">
            Your generosity fuels change. Thank you for considering a gift.
          </Text>
        </Box>

        <Box bg="white" p={{base: 6, md: 8}} borderRadius="lg" boxShadow="lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center" mb={8}>
            <Image 
              src={selectedCause.image} 
              alt={selectedCause.title} 
              borderRadius="md" 
              boxShadow="md" 
              objectFit="cover"
              maxH="300px"
            />
            <Box>
              <Heading as="h2" size="lg" color="primary.default" mb={3} fontFamily="primary">
                {selectedCause.title}
              </Heading>
              <Text color="text.base" fontSize="md">
                {selectedCause.description}
              </Text>
            </Box>
          </SimpleGrid>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isInvalid={!!errors.amount}>
                <FormLabel htmlFor="donation-amount" fontWeight="bold" fontFamily="primary">Choose Donation Amount ($)</FormLabel>
                <ButtonGroup spacing={4} mb={3} flexWrap="wrap">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={parseFloat(amount) === preset ? 'solid' : 'outline'}
                      colorScheme="primary"
                      onClick={() => { setAmount(preset.toString()); setErrors({...errors, amount: ''}); }}
                      minW="80px"
                    >
                      ${preset}
                    </Button>
                  ))}
                </ButtonGroup>
                <NumberInput value={amount} onChange={(valueString) => { setAmount(valueString); setErrors({...errors, amount: ''}); }} min={1}>
                  <NumberInputField id="donation-amount" placeholder="Or enter custom amount" />
                </NumberInput>
                {errors.amount && <FormErrorMessage>{errors.amount}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="donor-name" fontWeight="bold" fontFamily="primary">Full Name</FormLabel>
                <Input 
                  id="donor-name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => { setName(e.target.value); setErrors({...errors, name: ''}); }}
                  placeholder="e.g., Jane Doe"
                />
                {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel htmlFor="donor-email" fontWeight="bold" fontFamily="primary">Email Address</FormLabel>
                <Input 
                  id="donor-email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: ''}); }}
                  placeholder="e.g., jane.doe@example.com"
                />
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>

              <Box>
                <Text fontWeight="bold" fontFamily="primary" mb={2}>Payment Method (Conceptual)</Text>
                <Flex gap={4} alignItems="center" color="text.muted">
                  <Icon as={FaCreditCard} w={8} h={8} />
                  <Icon as={FaPaypal} w={8} h={8} />
                  <Icon as={FaApple} w={8} h={8} />
                </Flex>
                <Text fontSize="sm" color="text.muted" mt={1}>Actual payment integration is not part of this prototype.</Text>
              </Box>

              <Button 
                type="submit" 
                colorScheme="primary" 
                size="lg" 
                fontSize="xl" 
                py={6}
                fontFamily="primary"
                w="full"
              >
                Confirm Donation
              </Button>
            </VStack>
          </form>

          <Box textAlign="center" mt={8}>
            <Text fontSize="sm" color="text.muted">Secure Payment Processing</Text>
            {/* Placeholder for trust seals - can use actual images or icons */}
            <Flex justifyContent="center" gap={4} mt={2} opacity={0.7}>
                <Text fontSize="2xl">🛡️</Text>
                <Text fontSize="2xl">🔒</Text>
            </Flex>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default DonationPage;

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
  SimpleGrid,
  Spinner, // Added for loading state
  Alert, // Added for error state
  AlertIcon // Added for error state
} from '@chakra-ui/react';
import { FaCreditCard, FaPaypal, FaApple, FaShieldAlt, FaLock } from 'react-icons/fa'; // Example payment icons and trust icons
import { fetchCauseById, submitDonation as apiSubmitDonation } from '@/services/api'; // Assuming API functions are available

// DonationPage component for handling donations
const DonationPage = () => {
  const { causeId } = useParams(); // Get causeId from URL if present
  const navigate = useNavigate();
  const toast = useToast();

  // State for form inputs and selected cause
  const [selectedCause, setSelectedCause] = useState(null);
  const [loadingCause, setLoadingCause] = useState(true);
  const [causeError, setCauseError] = useState(null);

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-defined donation amounts
  const presetAmounts = [25, 50, 100, 250];

  // Effect to fetch cause details or set general cause
  useEffect(() => {
    const loadCause = async () => {
      setLoadingCause(true);
      setCauseError(null);
      if (causeId) {
        try {
          const causeData = await fetchCauseById(causeId); // Use API
          setSelectedCause(causeData);
        } catch (err) {
          setSelectedCause(null); // Clear previous cause if any
          setCauseError(`Cause '${causeId}' not found.`);
          toast({
            title: 'Cause not found.',
            description: `The cause '${causeId}' does not exist. Please choose another cause or donate to our general fund.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          navigate('/donate', { replace: true }); // Redirect to general donation page
        }
      } else {
        // General donation (no specific causeId)
        setSelectedCause({
          id: null, // Or a specific ID for 'general fund' if your backend supports it
          title: 'Support Our General Fund',
          description: 'Your donation to our general fund allows us to direct resources where they are most needed, responding to urgent priorities and supporting a wide range of impactful projects.',
          image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        });
      }
      setLoadingCause(false);
    };
    loadCause();
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
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) { // Slightly improved regex, case-insensitive
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        // Actual API call for donation processing
        await apiSubmitDonation({
          causeId: selectedCause ? selectedCause.id : null, // Handle general fund donations
          amount: parseFloat(amount),
          donorName: name,
          donorEmail: email,
        });
        setFormSubmitted(true);
        toast({
          title: 'Donation Submitted!',
          description: 'Thank you for your generous contribution.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Donation submission error:', error);
        toast({
          title: 'Donation Failed',
          description: error.response?.data?.error || 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setSubmitting(false);
    }
  };

  if (loadingCause) {
    return (
      <Container maxW="container.lg" py={{ base: 6, md: 10 }} textAlign="center">
        <Spinner size="xl" color="primary.default" thickness="4px" speed="0.65s" />
        <Text mt={4}>Loading cause information...</Text>
      </Container>
    );
  }

  if (causeError && !selectedCause) { // Only show full page error if no cause could be loaded
    return (
      <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>{causeError} Please try navigating from our causes page or make a general donation.</Text>
        </Alert>
        <Button mt={4} as={RouterLink} to="/" colorScheme="primary">Go to Homepage</Button>
      </Container>
    );
  }
  
  if (!selectedCause) { // Should not happen if logic is correct, but as a fallback
     return (
      <Container maxW="container.lg" py={{ base: 6, md: 10 }} textAlign="center">
        <Text>Could not load cause information. Please try again.</Text>
      </Container>
    );
  }

  if (formSubmitted) {
    return (
      <Container maxW="container.md" py={10} textAlign="center">
        <Box bg="secondary.light" p={10} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="xl" color="secondary.dark" mb={4} fontFamily="primary">
            Thank You For Your Generosity!
          </Heading>
          <Text fontSize="lg" color="neutral.textBase" mb={6}>
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
          <Heading as="h1" size="2xl" mb={2} fontFamily="primary" color="neutral.dark">
            Make a Donation
          </Heading>
          <Text fontSize="lg" color="neutral.textMuted">
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
              fallbackSrc={`https://via.placeholder.com/600x300?text=${encodeURIComponent(selectedCause.title)}`}
            />
            <Box>
              <Heading as="h2" size="lg" color="primary.default" mb={3} fontFamily="primary">
                {selectedCause.title}
              </Heading>
              <Text color="neutral.textBase" fontSize="md">
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
                      onClick={() => { setAmount(preset.toString()); setErrors(prev => ({...prev, amount: ''})); }}
                      minW="80px"
                    >
                      ${preset}
                    </Button>
                  ))}
                </ButtonGroup>
                <NumberInput value={amount} onChange={(valueString) => { setAmount(valueString); setErrors(prev => ({...prev, amount: ''})); }} min={1} precision={2}>
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
                  onChange={(e) => { setName(e.target.value); setErrors(prev => ({...prev, name: ''})); }}
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
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: ''})); }}
                  placeholder="e.g., jane.doe@example.com"
                />
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>

              <Box>
                <Text fontWeight="bold" fontFamily="primary" mb={2}>Payment Method (Conceptual)</Text>
                <Flex gap={4} alignItems="center" color="neutral.textMuted">
                  <Icon as={FaCreditCard} w={8} h={8} />
                  <Icon as={FaPaypal} w={8} h={8} />
                  <Icon as={FaApple} w={8} h={8} />
                </Flex>
                <Text fontSize="sm" color="neutral.textMuted" mt={1}>Actual payment integration is not part of this prototype.</Text>
              </Box>

              <Button 
                type="submit" 
                colorScheme="primary" 
                size="lg" 
                fontSize="xl" 
                py={6}
                fontFamily="primary"
                w="full"
                isLoading={submitting}
                loadingText="Processing..."
              >
                Confirm Donation
              </Button>
            </VStack>
          </form>

          <Box textAlign="center" mt={8}>
            <Text fontSize="sm" color="neutral.textMuted">Secure Payment Processing</Text>
            <Flex justifyContent="center" gap={4} mt={2} color="primary.default" opacity={0.7}>
                <Icon as={FaShieldAlt} boxSize={6} aria-label="Security Shield Icon"/>
                <Icon as={FaLock} boxSize={6} aria-label="Secure Lock Icon"/>
            </Flex>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default DonationPage;

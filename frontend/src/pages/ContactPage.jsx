import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  SimpleGrid,
  Icon,
  Link as ChakraLink,
  HStack,
  FormErrorMessage
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Example icons

// ContactPage component for user inquiries
const ContactPage = () => {
  const toast = useToast();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }
    if (!message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call for sending message
      console.log('Contact form submitted:', { name, email, subject, message });
      setFormSubmitted(true);
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Optionally reset form fields
      // setName(''); setEmail(''); setSubject(''); setMessage(''); setErrors({});
    }
  };

  if (formSubmitted) {
    return (
      <Container maxW="container.md" py={10} textAlign="center">
        <Box bg="secondary.light" p={10} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="xl" color="secondary.dark" mb={4} fontFamily="primary">
            Message Sent Successfully!
          </Heading>
          <Text fontSize="lg" color="text.base" mb={6}>
            Thank you for reaching out. We've received your message and will respond to <strong>{email}</strong> as soon as possible.
          </Text>
          <Button colorScheme="primary" onClick={() => setFormSubmitted(false)} size="lg">
            Send Another Message
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={2} fontFamily="primary" color="text.dark">
          Get In Touch
        </Heading>
        <Text fontSize="lg" color="text.muted">
          Have questions or need assistance? We're here to help.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 12 }} bg="white" p={{base:6, md:10}} borderRadius="lg" boxShadow="lg">
        {/* Contact Information Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" fontFamily="primary" color="primary.default">
            Contact Information
          </Heading>
          <Text color="text.base">
            Feel free to reach out to us with any inquiries. We aim to respond within 24-48 business hours.
          </Text>
          
          <HStack spacing={4} align="start">
            <Icon as={FaMapMarkerAlt} w={6} h={6} color="primary.default" mt={1}/>
            <Box>
              <Text fontWeight="bold" fontFamily="primary" color="text.dark">Our Office</Text>
              <Text color="text.muted">123 Hope Street, Charity City, CC 12345</Text>
            </Box>
          </HStack>

          <HStack spacing={4} align="start">
            <Icon as={FaEnvelope} w={6} h={6} color="primary.default" mt={1}/>
            <Box>
              <Text fontWeight="bold" fontFamily="primary" color="text.dark">Email Us</Text>
              <ChakraLink href="mailto:info@hopeharbor.org" color="primary.default" _hover={{ textDecoration: 'underline' }}>
                info@hopeharbor.org
              </ChakraLink>
            </Box>
          </HStack>

          <HStack spacing={4} align="start">
            <Icon as={FaPhoneAlt} w={5} h={5} color="primary.default" mt={1}/> {/* Adjusted size for phone icon */}
            <Box>
              <Text fontWeight="bold" fontFamily="primary" color="text.dark">Call Us</Text>
              <ChakraLink href="tel:+1234567890" color="primary.default" _hover={{ textDecoration: 'underline' }}>
                +1 (234) 567-890
              </ChakraLink>
            </Box>
          </HStack>
          
          <Box 
            mt={6} 
            h={{base: "200px", md: "auto"}} 
            flexGrow={1} 
            bg="gray.100" 
            borderRadius="md" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            color="gray.500"
            fontStyle="italic"
          >
            Office Location Map (Placeholder)
          </Box>
        </VStack>

        {/* Contact Form Section */}
        <VStack spacing={6} align="stretch" as="form" onSubmit={handleSubmit}>
          <Heading as="h2" size="lg" fontFamily="primary" color="text.dark">
            Send Us a Message
          </Heading>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel htmlFor="contact-name" fontWeight="bold" fontFamily="primary">Full Name</FormLabel>
            <Input id="contact-name" type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors({...errors, name: ''}); }} placeholder="Your Full Name" />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="contact-email" fontWeight="bold" fontFamily="primary">Email Address</FormLabel>
            <Input id="contact-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: ''}); }} placeholder="your.email@example.com" />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.subject}>
            <FormLabel htmlFor="contact-subject" fontWeight="bold" fontFamily="primary">Subject</FormLabel>
            <Input id="contact-subject" type="text" value={subject} onChange={(e) => { setSubject(e.target.value); setErrors({...errors, subject: ''}); }} placeholder="Regarding your donation..." />
            {errors.subject && <FormErrorMessage>{errors.subject}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.message}>
            <FormLabel htmlFor="contact-message" fontWeight="bold" fontFamily="primary">Your Message</FormLabel>
            <Textarea id="contact-message" value={message} onChange={(e) => { setMessage(e.target.value); setErrors({...errors, message: ''}); }} placeholder="Write your message here..." rows={5} />
            {errors.message && <FormErrorMessage>{errors.message}</FormErrorMessage>}
          </FormControl>

          <Button type="submit" colorScheme="primary" size="lg" fontSize="xl" py={6} fontFamily="primary" w="full">
            Send Message
          </Button>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default ContactPage;

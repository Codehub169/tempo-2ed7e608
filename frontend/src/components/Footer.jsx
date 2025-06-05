import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  Icon,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'700'} fontSize={'lg'} mb={2} fontFamily='primary'>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <ChakraLink
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      isExternal
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </ChakraLink>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg={useColorModeValue('neutral.dark', 'gray.900')}
      color={useColorModeValue('neutral.light', 'gray.200')}
      fontFamily='secondary'
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <ChakraLink
                as={RouterLink}
                to="/"
                fontFamily='primary'
                fontWeight='extrabold'
                fontSize='2xl'
                color={useColorModeValue('primary.default', 'primary.light')}
                _hover={{ textDecoration: 'none' }}
              >
                Hope<Text as='span' color={useColorModeValue('secondary.default', 'secondary.light')}>Harbor</Text>
              </ChakraLink>
            </Box>
            <Text fontSize={'sm'} color={useColorModeValue('neutral.textMuted', 'gray.400')}>
              &copy; {currentYear} HopeHarbor. All rights reserved.
            </Text>
            <Text fontSize={'sm'} color={useColorModeValue('neutral.textMuted', 'gray.400')}>
              Making a difference, together.
            </Text>
            <Stack direction={'row'} spacing={6} pt={2}>
              <SocialButton label={'Twitter'} href={'#'}>
                <Icon as={FaTwitter} w={5} h={5} />
              </SocialButton>
              <SocialButton label={'Facebook'} href={'#'}>
                <Icon as={FaFacebook} w={5} h={5} />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <Icon as={FaInstagram} w={5} h={5} />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <ChakraLink as={RouterLink} to="/about" _hover={{ color: 'primary.light' }}>About Us</ChakraLink>
            <ChakraLink as={RouterLink} to="/contact" _hover={{ color: 'primary.light' }}>Contact Us</ChakraLink>
            {/* <ChakraLink href={'#'} _hover={{ color: 'primary.light' }}>Testimonials</ChakraLink> */}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <ChakraLink as={RouterLink} to="/donate" _hover={{ color: 'primary.light' }}>Donate Now</ChakraLink>
            <ChakraLink href={'#'} _hover={{ color: 'primary.light' }}>FAQs</ChakraLink>
            <ChakraLink href={'#'} _hover={{ color: 'primary.light' }}>Terms of Service</ChakraLink>
            <ChakraLink href={'#'} _hover={{ color: 'primary.light' }}>Privacy Policy</ChakraLink>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            {/* Placeholder for a newsletter sign-up form if needed later */}
            <Text fontSize='sm' color={useColorModeValue('neutral.textMuted', 'gray.400')}>Subscribe to our newsletter for updates on new causes and impact stories.</Text>
            {/* Example Input and Button for newsletter */}
            {/* 
            <Stack direction={'row'}>
              <Input placeholder={'Your email address'} bg={'gray.100'} border={0} _focus={{ bg: 'whiteAlpha.300' }} />
              <IconButton bg={'green.400'} color={'white'} _hover={{bg: 'green.500'}} aria-label="Subscribe" icon={<EmailIcon />} />
            </Stack>
            */}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;

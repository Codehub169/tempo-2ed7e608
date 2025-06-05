import React from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Progress,
  VStack,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CauseListItem = ({ cause }) => {
  const { id, title, description, image, raisedAmount, goalAmount } = cause;
  const progressPercent = goalAmount > 0 ? (raisedAmount / goalAmount) * 100 : 0;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={useColorModeValue('md', 'lg')}
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: useColorModeValue('lg', 'xl'),
      }}
      display="flex"
      flexDirection="column"
      height="100%" // Ensure cards have same height in a grid
      bg={useColorModeValue('white', 'neutral.default')}
    >
      <Image src={image} alt={title} objectFit="cover" h="200px" w="100%" />

      <VStack p={5} spacing={3} align="stretch" flexGrow={1}>
        <Heading as="h3" size="md" fontFamily="primary" color={useColorModeValue('primary.dark', 'primary.light')}>
          {title}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('neutral.textMuted', 'gray.400')} noOfLines={3} flexGrow={1}>
          {description}
        </Text>

        <Box>
          <Progress 
            value={progressPercent} 
            size="sm" 
            colorScheme="secondary" 
            borderRadius="md" 
            mb={1}
            bg={useColorModeValue('gray.200', 'gray.600')}
          />
          <Flex justifyContent="space-between" fontSize="xs" color={useColorModeValue('neutral.textMuted', 'gray.400')}>
            <Text fontWeight="bold" color={useColorModeValue('secondary.dark', 'secondary.light')}>
              ${raisedAmount.toLocaleString()} <Text as="span" fontWeight="normal">Raised</Text>
            </Text>
            <Text>
              ${goalAmount.toLocaleString()} <Text as="span" fontWeight="normal">Goal</Text>
            </Text>
          </Flex>
        </Box>

        <Button
          as={RouterLink}
          to={`/donate/${id}`}
          colorScheme="primary"
          variant="solid"
          width="100%"
          mt="auto" // Pushes button to the bottom if card content is short
        >
          Donate Now
        </Button>
      </VStack>
    </Box>
  );
};

export default CauseListItem;

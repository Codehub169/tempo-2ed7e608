import React from 'react';
import PropTypes from 'prop-types'; // Added for prop validation
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

  // Fallback image if cause.image is not provided or fails to load
  const fallbackImage = "https://via.placeholder.com/400x200?text=HopeHarbor+Cause";

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
      bg={useColorModeValue('white', 'neutral.dark')} // Changed to neutral.dark for dark mode consistency
    >
      <Image 
        src={image || fallbackImage} // Use fallbackImage if cause.image is falsy
        alt={title}
        objectFit="cover" 
        h="200px" 
        w="100%" 
        fallbackSrc={fallbackImage} // Chakra's fallback for when src fails to load
      />

      <VStack p={5} spacing={3} align="stretch" flexGrow={1}>
        <Heading as="h3" size="md" fontFamily="primary" color={useColorModeValue('primary.dark', 'primary.light')}>
          {title}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('neutral.textMuted', 'gray.400')} noOfLines={3} flexGrow={1} minHeight="60px"> {/* Added minHeight for consistency */}
          {description}
        </Text>

        <Box pt={2}> {/* Added padding top for spacing */}
          <Progress 
            value={progressPercent} 
            size="sm" 
            colorScheme="secondary" 
            borderRadius="md" 
            mb={1}
            bg={useColorModeValue('gray.200', 'gray.700')} // Adjusted dark mode bg for progress track
          />
          <Flex justifyContent="space-between" fontSize="xs" color={useColorModeValue('neutral.textMuted', 'gray.400')}>
            <Text fontWeight="bold" color={useColorModeValue('secondary.dark', 'secondary.light')}>
              ${raisedAmount.toLocaleString()} <Text as="span" fontWeight="normal" color={useColorModeValue('neutral.textMuted', 'gray.400')}>Raised</Text>
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
          fontFamily="primary" // Ensure button font matches theme
        >
          Donate Now
        </Button>
      </VStack>
    </Box>
  );
};

CauseListItem.propTypes = {
  cause: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    raisedAmount: PropTypes.number.isRequired,
    goalAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CauseListItem;

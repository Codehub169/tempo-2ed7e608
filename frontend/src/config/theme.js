import { extendTheme } from '@chakra-ui/react';

// Define custom colors based on the project's design system
const colors = {
  primary: {
    default: '#3B82F6', // Blue
    dark: '#2563EB',
    light: '#EFF6FF',
  },
  secondary: {
    default: '#10B981', // Green
    dark: '#059669',
    light: '#D1FAE5',
  },
  accent: {
    default: '#F59E0B', // Amber
    dark: '#D97706',
    light: '#FFFBEB',
  },
  neutral: {
    light: '#F9FAFB',       // Light Gray (Backgrounds)
    default: '#FFFFFF',      // White (Card Backgrounds, etc.)
    dark: '#1F2937',         // Dark Gray (Text, Footers)
    textBase: '#374151',     // Base Text Color
    textMuted: '#6B7280',    // Muted Text Color
    border: '#E5E7EB',       // Border Color
  },
  status: {
    success: '#10B981', // Green (same as secondary.default for consistency)
    warning: '#F59E0B', // Amber (same as accent.default for consistency)
    error: '#EF4444',   // Red
  },
};

// Define custom fonts
const fonts = {
  primary: 'Poppins, sans-serif',    // For headings and prominent text
  secondary: 'Inter, sans-serif',      // For body text and UI elements
};

// Define custom box shadows
const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

// Define custom border radius
const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: fonts.primary,
    body: fonts.secondary,
  },
  shadows,
  radii,
  components: {
    Button: {
      baseStyle: {
        fontFamily: fonts.primary, // Apply Poppins to buttons by default
        fontWeight: '600',
      },
      variants: {
        solid: (props) => ({
          // Example: customize solid buttons based on colorScheme
          // if (props.colorScheme === 'primary') { ... }
        }),
      },
    },
    Link: {
      baseStyle: {
        fontFamily: fonts.secondary,
        _hover: {
          textDecoration: 'none', // Consistent link hover
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: fonts.primary,
      },
    },
    Text: {
      baseStyle: {
        fontFamily: fonts.secondary,
      },
    },
    // Add other component style overrides here if needed
  },
  styles: {
    global: (props) => ({
      'html, body': {
        fontFamily: 'secondary',
        color: props.colorMode === 'dark' ? 'neutral.light' : 'neutral.textBase',
        bg: props.colorMode === 'dark' ? 'neutral.dark' : 'neutral.light',
        lineHeight: '1.6',
      },
      // Custom scrollbar (optional, ensure it works cross-browser or remove)
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: props.colorMode === 'dark' ? 'neutral.dark' : 'neutral.border',
      },
      '::-webkit-scrollbar-thumb': {
        background: props.colorMode === 'dark' ? 'primary.dark' : 'primary.default',
        borderRadius: 'md',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: props.colorMode === 'dark' ? 'primary.default' : 'primary.dark',
      },
    }),
  },
});

export default theme;

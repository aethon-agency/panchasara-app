/**
 * Centralized color configuration for the mobile app
 * All colors should be imported from this file to maintain consistency
 */

export const COLORS = {
  primary: '#FF3300',
  primaryLight: '#FF8B73',
  primaryDark: '#E84430',

  primaryText: "#000000",
  secondaryText: "#707070",
  linkRed: "#C60000",
  buttonBg: "#EFEFEF",
  white: "#FFFFFF",

  secondary: '#FFD93D',
  secondaryLight: '#FFE57F',
  secondaryDark: '#FFB300',


  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#F3F4F6',

  // Text colors
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textLight: '#FFFFFF',

  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Neutral colors
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',

  transparent: 'transparent',

  onboarding: {
    illustrationBackground1: '#FFF5F2', // Light peach for first screen
    illustrationBackground2: '#FFF9E6', // Light yellow for second screen
    illustrationBackground3: '#FFF0F0', // Light pink for third screen
    illustrationBackground4: '#F0F4FF', // Light blue for fourth screen
  }
};

export const ThemeColors = {
  light: {
    text: COLORS.textPrimary,
    background: COLORS.backgroundPrimary,
    tint: COLORS.primary,
    icon: COLORS.textSecondary,
    tabIconDefault: COLORS.textSecondary,
    tabIconSelected: COLORS.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: COLORS.primary,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: COLORS.primary,
  },
};

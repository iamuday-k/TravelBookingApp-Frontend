// constants/tierConfig.js
export const TIER_CONFIG = {
  elite: {
    name: 'Elite Agencies',
    badge: {
      text: 'TOP PICK ',
      bg: 'bg-yellow-400',
      textColor: 'text-gray-900',
    },
    button: {
      bg: 'bg-yellow-400',
      text: 'text-gray-900',
      activeOpacity: 'active:bg-yellow-500',
    },
    header: {
      bg: 'bg-gradient-to-b from-yellow-900/30 to-transparent',
      iconColor: '#FBBF24',
    },
    filterButton: {
      active: 'bg-yellow-400 text-gray-900',
      inactive: 'bg-gray-800 text-gray-300',
    },
  },
  premium: {
    name: 'Premium Agencies',
    badge: {
      text: 'NEW',
      bg: 'bg-blue-500',
      textColor: 'text-white',
    },
    button: {
      bg: 'bg-blue-500',
      text: 'text-white',
      activeOpacity: 'active:bg-blue-600',
    },
    header: {
      bg: 'bg-gradient-to-b from-blue-900/30 to-transparent',
      iconColor: '#3B82F6',
    },
    filterButton: {
      active: 'bg-blue-500 text-white',
      inactive: 'bg-gray-800 text-gray-300',
    },
  },
  verified: {
    name: 'Verified Agencies',
    badge: {
      text: 'VERIFIED',
      bg: 'bg-green-500',
      textColor: 'text-white',
    },
    button: {
      bg: 'bg-green-500',
      text: 'text-white',
      activeOpacity: 'active:bg-green-600',
    },
    header: {
      bg: 'bg-gradient-to-b from-green-900/30 to-transparent',
      iconColor: '#10B981',
    },
    filterButton: {
      active: 'bg-green-500 text-white',
      inactive: 'bg-gray-800 text-gray-300',
    },
  },
};

export const LOCATIONS = ['All', 'Maldives', 'Switzerland', 'Dubai', 'Bali'];
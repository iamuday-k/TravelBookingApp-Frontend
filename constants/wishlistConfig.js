export const WISHLIST_FILTERS = ['All', 'Elite', 'Premium', 'Verified'];

export const SECTION_COLORS = {
  yellow: {
    bg: 'bg-yellow-400',
    text: 'text-gray-900'
  },
  red: {
    bg: 'bg-red-400',
    text: 'text-white'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-white'
  },
  orange: {
    bg: 'bg-orange-400',
    text: 'text-white'
  },
  // Default fallback
  default: {
    bg: 'bg-gray-700',
    text: 'text-white'
  }
};

// Map filter names to tier values
export const FILTER_TO_TIER = {
  'All': 'all',
  'Elite': 'elite',
  'Premium': 'premium',
  'Verified': 'verified'
};
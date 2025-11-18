import axios from "axios";

// Update this with your actual API base URL
const API_BASE_URL = "https://your-api-url.com/api";

// Set this to true to use mock data for testing
const USE_MOCK_DATA = true;

const mockData = {
  pagination: {
    total: 50,
    page: 1,
  },
  relevantAgencies: {
    elite: [
      {
        id: "agency1",
        name: "Prestige Travels, Munnar",
        price: 149999,
        rating: 5,
      },
      {
        id: "agency2",
        name: "Royal Globe Tours",
        price: 189999,
        rating: 4.9,
      },
    ],
    premium: [],
    verified: [],
    welcomeGift: [],
  },
  trips: [
    {
      id: "trip1",
      title: "Beautiful Beach",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      rating: 4.5,
    },
    {
      id: "trip2",
      title: "Mountain Escape",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      rating: 4.8,
    },
    {
      id: "trip3",
      title: "Desert Safari",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
      rating: 4.2,
    },
  ],
  relevantAgencies: {
    elite: [
      {
        id: "agency1",
        name: "Prestige Travels, Munnar",
        price: 149999,
        rating: 5,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
      {
        id: "agency2",
        name: "Royal Globe Tours",
        price: 189999,
        rating: 4.9,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
    ],
    premium: [
      {
        id: "agency3",
        name: "Sunrise Holidays",
        price: 89999,
        rating: 4.7,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
      {
        id: "agency4",
        name: "BlueSky Trips",
        price: 74999,
        rating: 4.6,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
    ],
    verified: [
      {
        id: "agency5",
        name: "Travel Buddy Co.",
        price: 59999,
        rating: 4.3,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
      {
        id: "agency6",
        name: "Holiday Connect",
        price: 69999,
        rating: 4.4,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
    ],
    welcomeGift: [
      {
        id: "agency7",
        name: "WanderFree",
        price: 54999,
        rating: 4.5,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
      {
        id: "agency8",
        name: "FlyAway Packages",
        price: 63999,
        rating: 4.2,
        image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      },
    ],
  },
  promotions: [
    {
      id: "promo1",
      title: "Special Offer",
      description: "Limited time offer for Maldives packages",
      discount: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400",
    },
    {
      id: "promo2",
      title: "Early Bird Discount",
      description: "Book 2 months early and save big",
      discount: "25% OFF",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400",
    },
  ],
  spiritualDestinations: [
    {
      id: "spirit1",
      title: "Kedarnath",
      image:
        "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=400",
      rating: 4.9,
      location: "Uttarakhand",
    },
    {
      id: "spirit2",
      title: "Varanasi",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400",
      rating: 4.8,
      location: "Uttar Pradesh",
    },
  ],
  popularDestinations: [
    {
      id: "pop1",
      title: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400",
      rating: 4.7,
      location: "India",
    },
    {
      id: "pop2",
      title: "Manali",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400",
      rating: 4.6,
      location: "Himachal Pradesh",
    },
    {
      id: "pop3",
      title: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
      rating: 4.9,
      location: "UAE",
    },
  ],
  testimonials: [
    {
      id: "test1",
      title: "Amazing Experience",
      author: "John Doe",
    },
    {
      id: "test2",
      title: "Great Service and Hospitality",
      author: "Priya Sharma",
    },
    {
      id: "test3",
      title: "Loved Every Moment",
      author: "Michael Lee",
    },
  ],
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = getToken(); // implement your token retrieval
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export const homeAPI = {
  getHomeData: async () => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return JSON.parse(JSON.stringify(mockData)); // This ensures the mock data structure matches
      }

      const response = await apiClient.get("/home");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          error: "NetworkError",
          message: "Failed to fetch data",
        }
      );
    }
  },
};

export default apiClient;
// ###################################################################################################################################
const mockAgenciesData = {
  elite: {
    agencies: [
      {
        id: "elite1",
        name: "Azure Escapes",
        location: "Maldives",
        price: 2500,
        rating: 5,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      },
      {
        id: "elite2",
        name: "Priya's Journeys",
        location: "Maldives",
        price: 2500,
        rating: 4,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400",
      },
      {
        id: "elite3",
        name: "Golden Chain",
        location: "Switzerland",
        price: 4500,
        rating: 5,
        image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400",
      },
      {
        id: "elite4",
        name: "Serenity Travels",
        location: "Maldives",
        price: 2800,
        rating: 5,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      },
      {
        id: "elite5",
        name: "Mirage Voyages",
        location: "Dubai",
        price: 4500,
        rating: 5,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      },
      {
        id: "elite6",
        name: "Alpine Escapes",
        location: "Switzerland",
        price: 3500,
        rating: 5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      },
    ],
    pagination: {
      total: 50,
      page: 1,
      limit: 10,
    },
  },
  premium: {
    agencies: [
      {
        id: "prem1",
        name: "Sunset Travels",
        location: "Maldives",
        price: 1800,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400",
      },
      {
        id: "prem2",
        name: "Ocean Dreams",
        location: "Bali",
        price: 2200,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      },
      {
        id: "prem3",
        name: "Mountain View",
        location: "Switzerland",
        price: 3000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      },
      {
        id: "prem4",
        name: "Paradise Tours",
        location: "Dubai",
        price: 2500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
      },
    ],
    pagination: {
      total: 30,
      page: 1,
      limit: 10,
    },
  },
  verified: {
    agencies: [
      {
        id: "ver1",
        name: "Safe Journey",
        location: "Maldives",
        price: 1500,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400",
      },
      {
        id: "ver2",
        name: "Travel Buddy",
        location: "Bali",
        price: 1700,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400",
      },
      {
        id: "ver3",
        name: "Vacation Plus",
        location: "Dubai",
        price: 2000,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400",
      },
    ],
    pagination: {
      total: 20,
      page: 1,
      limit: 10,
    },
  },
};

export const agencyAPI = {
  getAgenciesByTier: async (tier, page = 1, limit = 10) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const tierData = mockAgenciesData[tier.toLowerCase()];
        if (!tierData) {
          throw new Error(`Invalid tier: ${tier}`);
        }
        
        return {
          success: true,
          data: {
            agencies: tierData.agencies,
            pagination: {
              ...tierData.pagination,
              page,
              limit,
            },
          },
        };
      }

      const response = await apiClient.get(`/pages/agency-tier/${tier}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          error: "NetworkError",
          message: "Failed to fetch agencies",
        }
      );
    }
  },
};

// .##############################################################################################################################################
const mockWishlistData = [
  {
    wishlistId: "w-agency-1",
    name: "Agency 1",
    color: "yellow", // yellow, red, green, orange
    items: [
      {
        itemId: "trip-1",
        details: {
          id: "trip-1",
          name: "Pinnacle Journeys",
          location: "Switzerland",
          price: 3200,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
          tier: "premium"
        }
      },
      {
        itemId: "trip-2",
        details: {
          id: "trip-2",
          name: "Golden Oasis",
          location: "Maldives",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
          tier: "elite"
        }
      },
      {
        itemId: "trip-3",
        details: {
          id: "trip-3",
          name: "Pinnacle Journeys",
          location: "Iceland",
          price: 3200,
          rating: 4,
          image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400",
          tier: "premium"
        }
      },
      {
        itemId: "trip-4",
        details: {
          id: "trip-4",
          name: "Golden Oasis",
          location: "Dubai",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
          tier: "verified"
        }
      }
    ]
  },
  {
    wishlistId: "w-agency-2",
    name: "Agency 2",
    color: "red",
    items: [
      {
        itemId: "trip-5",
        details: {
          id: "trip-5",
          name: "Pinnacle Journeys",
          location: "Japan",
          price: 3200,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
          tier: "premium"
        }
      },
      {
        itemId: "trip-6",
        details: {
          id: "trip-6",
          name: "Golden Oasis",
          location: "Thailand",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400",
          tier: "elite"
        }
      },
      {
        itemId: "trip-7",
        details: {
          id: "trip-7",
          name: "Pinnacle Journeys",
          location: "Bali",
          price: 3200,
          rating: 4,
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
          tier: "verified"
        }
      },
      {
        itemId: "trip-8",
        details: {
          id: "trip-8",
          name: "Golden Oasis",
          location: "Singapore",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400",
          tier: "verified"
        }
      }
    ]
  },
  {
    wishlistId: "w-agency-3",
    name: "Agency 3",
    color: "green",
    items: [
      {
        itemId: "trip-9",
        details: {
          id: "trip-9",
          name: "Pinnacle Journeys",
          location: "New Zealand",
          price: 3200,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
          tier: "premium"
        }
      },
      {
        itemId: "trip-10",
        details: {
          id: "trip-10",
          name: "Golden Oasis",
          location: "Australia",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400",
          tier: "elite"
        }
      }
    ]
  },
  {
    wishlistId: "w-agency-4",
    name: "Agency 4",
    color: "orange",
    items: [
      {
        itemId: "trip-11",
        details: {
          id: "trip-11",
          name: "Pinnacle Journeys",
          location: "Peru",
          price: 3200,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=400",
          tier: "premium"
        }
      },
      {
        itemId: "trip-12",
        details: {
          id: "trip-12",
          name: "Golden Oasis",
          location: "Brazil",
          price: 4000,
          rating: 5,
          image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400",
          tier: "elite"
        }
      },
      {
        itemId: "trip-13",
        details: {
          id: "trip-13",
          name: "Pinnacle Journeys",
          location: "Argentina",
          price: 3200,
          rating: 4,
          image: "https://images.unsplash.com/photo-1542223616-740d0fea5d3f?w=400",
          tier: "verified"
        }
      }
    ]
  }
];

export const wishlistAPI = {
  getWishlist: async () => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 1000));
      return { success: true, data: mockWishlistData };
    }
    const response = await apiClient.get('/wishlist');
    return response.data;
  },

  removeFromWishlist: async (itemId) => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 500));
      console.log('Mock: Removing item from wishlist:', itemId);
      return { success: true, message: 'Item removed from wishlist' };
    }
    const response = await apiClient.delete(`/wishlist/${itemId}`);
    return response.data;
  }
};

// .####################################################################################################################################


const mockProfileData = {
  name: "User Name",
  email: "username@gmail.com",
  phone: "+91 1234567890",
  address: "1234 Main St, City, Country",
  profileImage: null, // Will use local asset
  settings: {
    notificationPreferences: true,
    currency: "Rupee",
    language: "English"
  }
};

export const profileAPI = {
  getProfile: async () => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      return { success: true, data: mockProfileData };
    }
    const response = await apiClient.get('/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      return { success: true, data: { ...mockProfileData, ...profileData } };
    }
    const response = await apiClient.put('/profile', profileData);
    return response.data;
  },

  updateSettings: async (settings) => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      console.log('Settings updated:', settings);
      return { success: true, data: { settings } };
    }
    const response = await apiClient.patch('/profile/settings', settings);
    return response.data;
  }
};

// ########################################################################################################

// Add this to your existing services/api.js file

const mockTripsData = {
  upcoming: [
    {
      id: "1",
      package: "Parisian Elegance",
      travelers: 2,
      hotel: "Hotel Le Royal Monceau",
      nights: 5,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      status: "upcoming"
    },
    {
      id: "2",
      package: "Maldives Serenity",
      travelers: 1,
      hotel: "The St. Regis Maldives Vommuli Resort",
      nights: 7,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      status: "upcoming"
    },
    {
      id: "3",
      package: "Swiss Alps Retreat",
      travelers: 4,
      hotel: "The Chedi Andermatt",
      nights: 3,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      status: "upcoming"
    }
  ],
  completed: [
    {
      id: "4",
      package: "Tokyo Adventure",
      travelers: 2,
      hotel: "Park Hyatt Tokyo",
      nights: 6,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      status: "completed"
    },
    {
      id: "5",
      package: "Santorini Sunset",
      travelers: 2,
      hotel: "Katikies Hotel",
      nights: 4,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      status: "completed"
    }
  ]
};

export const tripsAPI = {
  getTrips: async (status = 'all') => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      if (status === 'upcoming') {
        return { success: true, data: mockTripsData.upcoming };
      } else if (status === 'completed') {
        return { success: true, data: mockTripsData.completed };
      }
      return { 
        success: true, 
        data: [...mockTripsData.upcoming, ...mockTripsData.completed] 
      };
    }
    const response = await apiClient.get('/trips', { params: { status } });
    return response.data;
  },

  getTripDetails: async (tripId) => {
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      const allTrips = [...mockTripsData.upcoming, ...mockTripsData.completed];
      const trip = allTrips.find(t => t.id === tripId);
      return { success: true, data: trip };
    }
    const response = await apiClient.get(`/trips/${tripId}`);
    return response.data;
  }
};

// ##################################################################################################################################
const mockSearchData = {
  pagination: {
    total: 50,
    page: 1
  },
  trips: [
    {
      id: 'trip_1',
      details: {
        id: 'trip_1',
        name: 'Pinnacle Journeys',
        location: 'Switzerland',
        price: 3200,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        tier: 'elite',
        days: 5
      }
    },
    {
      id: 'trip_2',
      details: {
        id: 'trip_2',
        name: 'Golden Oasis',
        location: 'Dubai',
        price: 4000,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        tier: 'premium',
        days: 7
      }
    },
    {
      id: 'trip_3',
      details: {
        id: 'trip_3',
        name: 'Alpine Adventure',
        location: 'Austria',
        price: 2800,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        tier: 'verified',
        days: 4
      }
    },
    {
      id: 'trip_4',
      details: {
        id: 'trip_4',
        name: 'Tropical Paradise',
        location: 'Maldives',
        price: 5500,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
        tier: 'elite',
        days: 6
      }
    },
    {
      id: 'trip_5',
      details: {
        id: 'trip_5',
        name: 'Desert Dreams',
        location: 'Morocco',
        price: 1800,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800',
        tier: 'premium',
        days: 3
      }
    },
    {
      id: 'trip_6',
      details: {
        id: 'trip_6',
        name: 'Island Escape',
        location: 'Bali',
        price: 2200,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        tier: 'verified',
        days: 5
      }
    }
  ],
  relevantAgencies: {
    elite: [
      {
        id: 'agency_elite_1',
        name: 'Prestige Travels, Munnar',
        location: 'Munnar, Kerala',
        price: 149999,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        tier: 'elite'
      },
      {
        id: 'agency_elite_2',
        name: 'Luxury Expeditions',
        location: 'Goa',
        price: 129999,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        tier: 'elite'
      }
    ],
    premium: [
      {
        id: 'agency_premium_1',
        name: 'Premium Wanderlust',
        location: 'Jaipur, Rajasthan',
        price: 89999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
        tier: 'premium'
      },
      {
        id: 'agency_premium_2',
        name: 'Elite Getaways',
        location: 'Udaipur, Rajasthan',
        price: 99999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        tier: 'premium'
      }
    ],
    verified: [
      {
        id: 'agency_verified_1',
        name: 'Verified Adventures',
        location: 'Manali, Himachal',
        price: 59999,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        tier: 'verified'
      },
      {
        id: 'agency_verified_2',
        name: 'Trust Travel Co',
        location: 'Shimla, Himachal',
        price: 49999,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
        tier: 'verified'
      }
    ]
  }
};

export const searchAPI = {
  searchTrips: async ({ q, minPrice, maxPrice, minDays, maxDays, minHotelRating }) => {
    if (USE_MOCK_DATA) {
      console.log('Search API called with params:', {
        q,
        minPrice,
        maxPrice,
        minDays,
        maxDays,
        minHotelRating
      });
      
      await new Promise(r => setTimeout(r, 800));
      
      // Filter mock data based on params
      let filteredTrips = [...mockSearchData.trips];
      let filteredAgencies = { ...mockSearchData.relevantAgencies };
      
      if (q) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.details.name.toLowerCase().includes(q.toLowerCase()) ||
          trip.details.location.toLowerCase().includes(q.toLowerCase())
        );
      }
      
      if (minPrice !== undefined && maxPrice !== undefined) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.details.price >= minPrice && trip.details.price <= maxPrice
        );
        
        Object.keys(filteredAgencies).forEach(tier => {
          filteredAgencies[tier] = filteredAgencies[tier].filter(agency =>
            agency.price >= minPrice && agency.price <= maxPrice
          );
        });
      }
      
      if (minDays !== undefined && maxDays !== undefined) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.details.days >= minDays && trip.details.days <= maxDays
        );
      }
      
      if (minHotelRating !== undefined) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.details.rating >= minHotelRating
        );
        
        Object.keys(filteredAgencies).forEach(tier => {
          filteredAgencies[tier] = filteredAgencies[tier].filter(agency =>
            agency.rating >= minHotelRating
          );
        });
      }
      
      return {
        success: true,
        data: {
          pagination: {
            total: filteredTrips.length,
            page: 1
          },
          trips: filteredTrips,
          relevantAgencies: filteredAgencies
        }
      };
    }
    
    // Real API call
    const response = await apiClient.get('/search', {
      params: { q, minPrice, maxPrice, minDays, maxDays, minHotelRating }
    });
    return response.data;
  }
};

// ############################################################################################

const mockPackagesData = {
  pagination: {
    total: 15,
    page: 1,
    totalPages: 2
  },
  packages: [
    {
      packageId: "pkg-001",
      name: "Maldives Bliss",
      category: "popular",
      description: "Tropical in paradise",
      price: 85000,
      currency: "INR",
      duration: "5 days",
      rating: 4.8,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      location: "Maldives",
      status: "active",
      featured: true
    },
    {
      packageId: "pkg-002",
      name: "Alpine Retreat",
      category: "popular",
      description: "Ski in style",
      price: 95000,
      currency: "INR",
      duration: "6 days",
      rating: 4.9,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800",
      location: "Swiss Alps",
      status: "active",
      featured: true
    },
    {
      packageId: "pkg-003",
      name: "GOA",
      category: "domestic",
      description: "Explore GOA",
      price: 52000,
      currency: "INR",
      duration: "4 days",
      rating: 4.6,
      reviews: 180,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      location: "Goa, India",
      status: "active",
      featured: false
    },
    {
      packageId: "pkg-004",
      name: "Kerala Backwaters",
      category: "domestic",
      description: "Cruise through serene backwaters",
      price: 48000,
      currency: "INR",
      duration: "5 days",
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      location: "Kerala, India",
      status: "active",
      featured: false
    },
    {
      packageId: "pkg-005",
      name: "Maldives Bliss",
      category: "international",
      description: "Unwind in luxury",
      price: 120000,
      currency: "INR",
      duration: "7 days",
      rating: 4.9,
      reviews: 230,
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      location: "Maldives",
      status: "active",
      featured: false
    },
    {
      packageId: "pkg-006",
      name: "Alpine Retreat",
      category: "international",
      description: "Mountain adventure",
      price: 145000,
      currency: "INR",
      duration: "8 days",
      rating: 4.8,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      location: "Switzerland",
      status: "active",
      featured: false
    },
    {
      packageId: "pkg-007",
      name: "Caribbean Hideaway",
      category: "international",
      description: "Escape to tranquility",
      price: 135000,
      currency: "INR",
      duration: "6 days",
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      location: "Caribbean",
      status: "active",
      featured: false
    }
  ]
};

export const packagesAPI = {
  getAllPackages: async (params = {}) => {
    console.log('📦 Fetching packages with params:', params);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      
      let filteredPackages = [...mockPackagesData.packages];
      
      // Filter by category if provided
      if (params.category && params.category !== 'all') {
        filteredPackages = filteredPackages.filter(
          pkg => pkg.category === params.category
        );
      }
      
      return {
        success: true,
        data: {
          pagination: {
            total: filteredPackages.length,
            page: params.page || 1,
            totalPages: Math.ceil(filteredPackages.length / 10)
          },
          packages: filteredPackages
        }
      };
    }
    const response = await apiClient.get('/packages', { params });
    return response.data;
  },

  getPackageById: async (packageId) => {
    console.log('📦 Fetching package:', packageId);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 500));
      const pkg = mockPackagesData.packages.find(p => p.packageId === packageId);
      return { success: true, data: pkg };
    }
    const response = await apiClient.get(`/packages/${packageId}`);
    return response.data;
  }
};

// ##########################################################################################################################################
const mockPackageDetailsData = {
  packageId: "pkg-003",
  name: "GOA",
  location: "Goa, India",
  description: "Luxury Resort",
  tagline: "BAREFOOT BLISS",
  headerImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
  packages: [
    {
      id: "goa-pkg-1",
      name: "Goa Luxury Package 1",
      rating: 5,
      ratingText: "5-star hotel",
      price: 1200,
      pricePerPerson: true,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      duration: "3 days",
      included: ["Breakfast", "Airport Transfer", "Spa Access"]
    },
    {
      id: "goa-pkg-2",
      name: "Goa Luxury Package 1",
      rating: 5,
      ratingText: "5-star hotel",
      price: 1500,
      pricePerPerson: true,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      duration: "5 days",
      included: ["All Meals", "Airport Transfer", "Pool Access", "Spa"]
    },
    {
      id: "goa-pkg-3",
      name: "W Goa",
      rating: 5,
      ratingText: "5-star hotel",
      price: 1800,
      pricePerPerson: true,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      duration: "7 days",
      included: ["Luxury Suite", "All Inclusive", "Private Beach", "Spa"]
    }
  ],
  experiences: [
    { id: "exp-1", name: "Private Beach Access", icon: "umbrella" },
    { id: "exp-2", name: "Spa Treatment", icon: "heart" },
    { id: "exp-3", name: "Gourmet Dining", icon: "coffee" }
  ],
  filters: {
    duration: ["3 Days", "5 Days", "7 Days"],
    rating: ["5 Stars", "4 Stars"],
    priceRange: ["$1,000 - $2,000", "$2,000 - $3,000"],
    packageType: ["All Packages", "Luxury", "Premium"]
  }
};

export const packageDetailsAPI = {
  getPackageDetails: async (packageId) => {
    console.log('📦 Fetching package details for:', packageId);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      
      // Customize mock data based on packageId
      const customData = { ...mockPackageDetailsData };
      
      // Find package from main packages list
      let mainPackage = mockPackagesData.packages.find(p => p.packageId === packageId);

      // If not found, try to find it in the trips list from the home page mock data
      if (!mainPackage) {
        const trip = mockData.trips.find(t => t.id === packageId);
        if (trip) {
          mainPackage = {
            packageId: trip.id,
            name: trip.title,
            location: 'Mock Location', // Add a mock location
            image: trip.image,
          };
        }
      }
      
      if (mainPackage) {
        customData.name = mainPackage.location || mainPackage.name;
        customData.location = mainPackage.location;
        customData.headerImage = mainPackage.image;
      }
      
      return { success: true, data: customData };
    }
    const response = await apiClient.get(`/packages/${packageId}/details`);
    return response.data;
  }
};


// #########################################################################################################################################################3


const mockItineraryData = {
  packageId: "goa-pkg-1",
  title: "Trip Overview",
  destination: "Paris",
  description: "Experience the allure of Paris with a curated journey through its iconic landmarks and hidden gems. Indulge in gourmet dining, explore world-class museums, and stroll through charming streets to create unforgettable memories in the City of Lights.",
  headerImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
  rating: 4.8,
  totalReviews: 120,
  ratingBreakdown: [
    { stars: 5, percentage: 100 },
    { stars: 4, percentage: 50 },
    { stars: 3, percentage: 30 },
    { stars: 2, percentage: 10 },
    { stars: 1, percentage: 5 }
  ],
  inclusions: [
    { category: "Accommodation", items: [{ name: "Luxury Hotel", included: true }] },
    { category: "Meals", items: [{ name: "Breakfast Included", included: true }] },
    { category: "Activities", items: [{ name: "Guided Tours", included: true }] },
    { category: "Transport", items: [{ name: "Private Car", included: true }] },
    { category: "Flights", items: [{ name: "Not Included", included: false }] },
    { category: "Insurance", items: [{ name: "Not Included", included: false }] },
    { category: "Personal Expenses", items: [{ name: "Not Included", included: false }] },
    { category: "Gratuities", items: [{ name: "Not Included", included: false }] }
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Eiffel Tower",
      description: "Check in, explore local cafes, and enjoy a breathtaking view from the Eiffel Tower.",
      icon: "map-pin"
    },
    {
      day: 2,
      title: "Louvre & Seine Cruise",
      description: "Visit the Louvre Museum, take a relaxing cruise on the Seine, and savor a gourmet dinner.",
      icon: "map-pin"
    },
    {
      day: 3,
      title: "Departure",
      description: "Enjoy a final Parisian breakfast before departing from the city.",
      icon: "map-pin"
    }
  ],
  price: 490,
  currency: "USD",
  gallery: [
    { id: 1, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
    { id: 2, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400" },
    { id: 3, image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400" },
    { id: 4, image: "https://images.unsplash.com/photo-1500039436846-25ae2f11882e?w=400" }
  ]
};

export const itineraryAPI = {
  getItinerary: async (packageId) => {
    console.log('📋 Fetching itinerary for:', packageId);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      
      const customData = { ...mockItineraryData };
      customData.packageId = packageId;
      
      return { success: true, data: customData };
    }
    const response = await apiClient.get(`/packages/${packageId}/itinerary`);
    return response.data;
  }
};



// Add this to your existing services/api.js

const mockBookingData = {
  packageId: "goa-pkg-1",
  packageName: "Parisian Getaway",
  location: "Paris, France",
  duration: "5 nights",
  headerImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
  accommodations: [
    {
      id: "acc-1",
      name: "Villa Serenity",
      type: "4 Bedrooms, Sleeps 8",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      pricePerNight: 2000
    },
    {
      id: "acc-2",
      name: "Ocean View Suite",
      type: "2 Bedrooms, Sleeps 4",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      pricePerNight: 1200
    }
  ],
  paymentMethods: [
    { id: "card-1", type: "MasterCard", last4: "4242", icon: "credit-card" },
    { id: "card-2", type: "Visa", last4: "1234", icon: "credit-card" },
    { id: "paypal", type: "Paypal", last4: "", icon: "dollar-sign" }
  ]
};

export const bookingAPI = {
  getBookingDetails: async (packageId) => {
    console.log('🎫 Fetching booking details for:', packageId);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 800));
      return { success: true, data: mockBookingData };
    }
    const response = await apiClient.get(`/packages/${packageId}/booking`);
    return response.data;
  },

  createBooking: async (bookingData) => {
    console.log('📝 Creating booking:', bookingData);
    if (USE_MOCK_DATA) {
      await new Promise(r => setTimeout(r, 1000));
      return {
        success: true,
        data: {
          bookingId: "BK-" + Date.now(),
          status: "confirmed",
          ...bookingData,
          confirmationNumber: "CONF-" + Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      };
    }
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  }
};




// ################################################################################################################################################

const mockAgencyDashboardData = {
  stats: {
    totalBookings: 120,
    totalBookingsChange: 10,          // %
    totalEarnings: 25000,             // $
    totalEarningsChange: 15,          // %
    activePackages: 15,
    activePackagesChange: 5,          // %
    rating: 4.8,
    ratingChange: 2,                  // %
    reviewsCount: 120,
  },
  samplePackages: [
    {
      id: "pkg1",
      title: "Luxury Getaway",
      nights: 4, days: 5,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    },
    {
      id: "pkg2",
      title: "Adventure Trip",
      nights: 6, days: 7,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    },
    {
      id: "pkg3",
      title: "Relaxing Retreat",
      nights: 2, days: 3,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    },
  ],
  latestBookings: [
    { id: "bk1", title: "Luxury Getaway", bookingId: "12345", price: 2500, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400"},
    { id: "bk2", title: "Adventure Trip", bookingId: "67890", price: 3000, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
    { id: "bk3", title: "Relaxing Retreat", bookingId: "11223", price: 1800, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
  ],
  interactions: {
    newQueries: 2,
    newReplies: 3,
  },
  ratingBreakdown: { 5: 100, 4: 50, 3: 30, 2: 10, 1: 5 }, // percentages shown in UI
  monthlyBookingsChart: {
    total: 120,
    last6Months: [
      { label: "Jan", value: 115 },
      { label: "Feb", value: 118 },
      { label: "Mar", value: 116 },
      { label: "Apr", value: 119 },
      { label: "May", value: 121 },
      { label: "Jun", value: 120 },
    ],
  },
};

// ---------- API WRAPPER ----------
export const agencyDashboardAPI = {
  getDashboard: async (params = {}) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      return { success: true, data: mockAgencyDashboardData }; // 200 OK
    }
    try {
      const res = await apiClient.get("/agency/dashboard", { params });
      return res.data; // must be { success: true, data: {...} }
    } catch (e) {
      if (e?.response?.status === 403) {
        return { error: "Forbidden", message: "Access denied." }; // 403
      }
      throw e;
    }
  },
};



// ##############################################################################################################################################################################

const mockPackages = [
  {
    packageId: "pkg-1",
    name: "Explore GOA",
    startingPrice: 2500,
    status: "active",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
    createdAt: "2024-10-01T10:00:00Z",
  },
  {
    packageId: "pkg-2",
    name: "Explore GOA",
    startingPrice: 2500,
    status: "pending",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
    createdAt: "2024-09-10T10:00:00Z",
  },
  {
    packageId: "pkg-3",
    name: "Explore GOA",
    startingPrice: 2500,
    status: "pending",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
    createdAt: "2024-09-08T10:00:00Z",
  },
  {
    packageId: "pkg-4",
    name: "Explore GOA",
    startingPrice: 2500,
    status: "pending",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
    createdAt: "2024-08-20T10:00:00Z",
  },
];

export const agencyPackagesAPI = {
  /**
   * getList(params)
   * params: { status?: 'active'|'pending', sort?: 'recent'|'priceAsc'|'priceDesc', page?: number }
   * success -> { pagination: { total, page }, packages: [...] }
   * error  -> { error: "Forbidden", message: "Access denied." }
   */
  getList: async (params = {}) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      let list = [...mockPackages];
      if (params.status) list = list.filter((p) => p.status === params.status);
      if (params.sort === "priceAsc") list.sort((a, b) => a.startingPrice - b.startingPrice);
      if (params.sort === "priceDesc") list.sort((a, b) => b.startingPrice - a.startingPrice);
      return { pagination: { total: list.length, page: params.page || 1 }, packages: list };
    }

    try {
      const res = await apiClient.get("/agency/packages", { params });
      return res.data; // expected { pagination, packages } or { error, message }
    } catch (e) {
      if (e?.response?.status === 403) return { error: "Forbidden", message: "Access denied." };
      throw e;
    }
  },

  delete: async (packageId) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 300));
      // simulate success
      return { success: true };
    }
    return apiClient.delete(`/agency/packages/${packageId}`).then((r) => r.data);
  },

  createPackage: async (payload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      const created = {
        packageId: `pkg-${Math.random().toString(36).slice(2, 9)}`,
        ...payload,
        createdAt: new Date().toISOString(),
      };
      // optionally push into mockPackages (so subsequent fetch sees it)
      mockPackages.unshift(created);
      return { success: true, data: created };
    }
    const res = await apiClient.post("/agency/packages", payload);
    return res.data;
  },
};



// ##########################################################################################################################################################################
const mockAgencyEarningsData = {
  summary: {
    total: 75000,
    available: 75000,
    pending: 75000,
  },
  graphData: [
    { month: 'Jan 2025', value: 5000 },
    { month: 'Feb 2025', value: 12000 },
    { month: 'Mar 2025', value: 10 },
    { month: 'Apr 2025', value: 50000 },
  ],
  payoutHistory: [
    {
      id: '1',
      date: 'April 2025',
      month: 'April 2025',
      amount: 50000,
      status: 'Successful',
    },
    {
      id: '2',
      date: 'May 2025',
      month: 'May 2025',
      amount: 25000,
      status: 'Pending',
    },
    {
      id: '3',
      date: 'June 2025',
      month: 'June 2025',
      amount: 30000,
      status: 'Successful',
    },
    {
      id: '4',
      date: 'July 2025',
      month: 'July 2025',
      amount: 15000,
      status: 'Cancel',
    },
  ],
};

// Agency Earnings API
export const agencyEarningsAPI = {
  getEarnings: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USE_MOCK_DATA) {
          resolve(mockAgencyEarningsData);
        } else {
          // Real API call would go here
          // fetch('/api/agency/earnings')
          //   .then(res => res.json())
          //   .then(data => resolve(data))
          //   .catch(err => reject(err));
          reject(new Error('Real API not implemented'));
        }
      }, 800);
    });
  },
};


// ##############################################################################################################################################################

const mockAgencyBookingsData = {
  stats: {
    total: 156,
    confirmed: 124,
    pending: 18,
  },
  bookings: [
    {
      id: '1',
      customerName: 'Priya Sharma',
      phone: '+91 98765 43210',
      package: 'Goa Beach Paradise - 5N/6D',
      bookedDate: '15 Sep 2025',
      travelDate: '5 Oct 2025',
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
      badges: ['Paid', 'Confirmed'],
    },
    {
      id: '2',
      customerName: 'Rahul Verma',
      phone: '+91 87654 32109',
      package: 'Kerala Backwaters - 4N/5D',
      bookedDate: '18 Sep 2025',
      travelDate: '12 Oct 2025',
      paymentStatus: 'Pending',
      bookingStatus: 'Awaiting',
      badges: ['Pending', 'Awaiting'],
    },
    {
      id: '3',
      customerName: 'Anjali Mehta',
      phone: '+91 76543 21098',
      package: 'Rajasthan Royal Tour - 7N/8D',
      bookedDate: '20 Sep 2025',
      travelDate: '1 Nov 2025',
      paymentStatus: 'Refund',
      bookingStatus: 'Cancelled',
      badges: ['Refund'],
    },
    {
      id: '4',
      customerName: 'Vikram Singh',
      phone: '+91 65432 10987',
      package: 'Himachal Adventure - 6N/7D',
      bookedDate: '22 Sep 2025',
      travelDate: '15 Oct 2025',
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
      badges: ['Paid', 'Confirmed'],
    },
    {
      id: '5',
      customerName: 'Sneha Patel',
      phone: '+91 54321 09876',
      package: 'Manali Honeymoon - 5N/6D',
      bookedDate: '25 Sep 2025',
      travelDate: '20 Oct 2025',
      paymentStatus: 'Pending',
      bookingStatus: 'Awaiting',
      badges: ['Pending', 'Awaiting'],
    },
  ],
};

export const agencyBookingsAPI = {
  getBookings: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USE_MOCK_DATA) {
          resolve(mockAgencyBookingsData);
        } else {
          reject(new Error('Real API not implemented'));
        }
      }, 800);
    });
  },
};


// ##################################################################################################################################################################################


export const mockAgencyProfileData = {
id: 'agency_123',
name: 'Travel Agency',
email: 'gvagencyname@gmail.com',
phone: '+91 1234567890',
address: '1234 Main St, City, Country',
timezone: 'IST 5:30 PM',
language: 'English',
profilePicture:
'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
};


export const agencyProfileAPI = {
getProfile: () => {
return new Promise((resolve, reject) => {
if (USE_MOCK_DATA) {
setTimeout(() => resolve(mockAgencyProfileData), 600);
return;
}


// Real API call example (uncomment & adapt)
// fetch(`${API_BASE_URL}/agency/profile`, { headers })
// .then(res => res.json())
// .then(data => resolve(data))
// .catch(err => reject(err));


reject(new Error('No real API implementation for agency profile'));
});
},
};


// ####################################################################################################################################################



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
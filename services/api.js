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
// import axios from 'axios';

// // Update this with your actual API base URL
// const API_BASE_URL = 'https://mocki.io/v1/089e4a62-e61c-4a96-9844-34393b18fd30';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if available
// apiClient.interceptors.request.use(
//   (config) => {
//     // You can add auth token here if needed
//     // const token = getToken(); // implement your token retrieval
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle responses
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//     }
//     return Promise.reject(error);
//   }
// );

// export const homeAPI = {
//   getHomeData: async () => {
//     try {
//       const response = await apiClient.post('/auth/logout'); // As per your endpoint
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { error: 'NetworkError', message: 'Failed to fetch data' };
//     }
//   },
// };

// export default apiClient;

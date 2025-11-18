import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingAPI } from '../../services/api';

export const fetchBookingDetails = createAsyncThunk(
  'booking/fetchDetails',
  async (packageId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching booking details...');
      const res = await bookingAPI.getBookingDetails(packageId);
      console.log('✅ Booking details fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching booking details:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      console.log('🔄 Creating booking...');
      const res = await bookingAPI.createBooking(bookingData);
      console.log('✅ Booking created:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error creating booking:', error);
      return rejectWithValue(error.message);
    }
  }
);

const userBookingSlice = createSlice({
  name: 'booking',
  initialState: {
    details: null,
    currentBooking: {
      step: 1,
      travelerDetails: {
        fullName: '',
        email: '',
        phoneNumber: ''
      },
      dates: {
        startDate: null,
        endDate: null
      },
      accommodation: null,
      guests: 2,
      paymentMethod: null,
      agreedToTerms: false
    },
    confirmation: null,
    loading: false,
    error: null
  },
  reducers: {
    updateTravelerDetails: (state, action) => {
      console.log('👤 Updating traveler details:', action.payload);
      state.currentBooking.travelerDetails = {
        ...state.currentBooking.travelerDetails,
        ...action.payload
      };
    },
    updateDates: (state, action) => {
      console.log('📅 Updating dates:', action.payload);
      state.currentBooking.dates = action.payload;
    },
    selectAccommodation: (state, action) => {
      console.log('🏨 Selecting accommodation:', action.payload);
      state.currentBooking.accommodation = action.payload;
    },
    updateGuests: (state, action) => {
      console.log('👥 Updating guests:', action.payload);
      state.currentBooking.guests = action.payload;
    },
    selectPaymentMethod: (state, action) => {
      console.log('💳 Selecting payment method:', action.payload);
      state.currentBooking.paymentMethod = action.payload;
    },
    toggleTerms: (state) => {
      state.currentBooking.agreedToTerms = !state.currentBooking.agreedToTerms;
      console.log('📋 Terms agreed:', state.currentBooking.agreedToTerms);
    },
    setStep: (state, action) => {
      console.log('📍 Setting step:', action.payload);
      state.currentBooking.step = action.payload;
    },
    resetBooking: (state) => {
      console.log('🔄 Resetting booking');
      state.currentBooking = {
        step: 1,
        travelerDetails: { fullName: '', email: '', phoneNumber: '' },
        dates: { startDate: null, endDate: null },
        accommodation: null,
        guests: 2,
        paymentMethod: null,
        agreedToTerms: false
      };
      state.confirmation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmation = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  updateTravelerDetails,
  updateDates,
  selectAccommodation,
  updateGuests,
  selectPaymentMethod,
  toggleTerms,
  setStep,
  resetBooking
} = userBookingSlice.actions;

export default userBookingSlice.reducer;
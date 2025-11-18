import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookingDetails,
  createBooking,
  updateTravelerDetails,
  updateDates,
  selectAccommodation,
  updateGuests,
  selectPaymentMethod,
  toggleTerms,
  setStep
} from '../store/slices/userBookingSlice';

export const useBooking = (packageId) => {
  const dispatch = useDispatch();
  const {
    details,
    currentBooking,
    confirmation,
    loading,
    error
  } = useSelector(state => state.booking);

  useEffect(() => {
    if (packageId) {
      console.log('🎣 useBooking hook - fetching:', packageId);
      dispatch(fetchBookingDetails(packageId));
    }
  }, [packageId, dispatch]);

  const updateTraveler = (data) => {
    dispatch(updateTravelerDetails(data));
  };

  const updateBookingDates = (dates) => {
    dispatch(updateDates(dates));
  };

  const chooseAccommodation = (accommodation) => {
    dispatch(selectAccommodation(accommodation));
  };

  const setGuests = (count) => {
    dispatch(updateGuests(count));
  };

  const choosePaymentMethod = (method) => {
    dispatch(selectPaymentMethod(method));
  };

  const agreeToTerms = () => {
    dispatch(toggleTerms());
  };

  const nextStep = () => {
    dispatch(setStep(currentBooking.step + 1));
  };

  const prevStep = () => {
    dispatch(setStep(currentBooking.step - 1));
  };

  const submitBooking = () => {
    dispatch(createBooking(currentBooking));
  };

  return {
    details,
    currentBooking,
    confirmation,
    loading,
    error,
    updateTraveler,
    updateBookingDates,
    chooseAccommodation,
    setGuests,
    choosePaymentMethod,
    agreeToTerms,
    nextStep,
    prevStep,
    submitBooking
  };
};
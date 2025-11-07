import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useBooking } from '../../hooks/useBooking';
import BookingHeader from '../components/booking/BookingHeader';
import TravelerDetailsForm from '../components/booking/TravelerDetailsForm';
import DateSelector from '../components/booking/DateSelector';
import AccommodationSelector from '../components/booking/AccomodationSelector';
import BookingSummary from '../components/booking/BookingSummary';
import PaymentMethodSelector from '../components/booking/PaymentsMethodSection';
import TermsCheckbox from '../components/booking/TermsCheckBox';
import BookPayButton from '../components/booking/BookPlayButton';

const BookingPage = () => {
  console.log('📄 Rendering BookingPage');

  const { id } = useLocalSearchParams();
  const {
    details,
    currentBooking,
    confirmation,
    loading,
    error,
    updateTraveler,
    updateBookingDates,
    chooseAccommodation,
    choosePaymentMethod,
    agreeToTerms,
    submitBooking
  } = useBooking(id);

  const handleBooking = async () => {
    console.log('🎯 Submitting booking...');
    await submitBooking();
    
    // Navigate to confirmation after successful booking
    if (confirmation) {
      console.log('✅ Booking confirmed, navigating to confirmation page');
      router.push({ pathname: '/BookingConfirmation', params: { id: confirmation.bookingId } });
    }
  };

  if (loading && !details) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-400 mt-4">Loading booking details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-400 text-center">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!details) {
    return null;
  }

  const canSubmit = 
    currentBooking.travelerDetails.fullName &&
    currentBooking.travelerDetails.email &&
    currentBooking.travelerDetails.phoneNumber &&
    currentBooking.accommodation &&
    currentBooking.paymentMethod &&
    currentBooking.agreedToTerms;

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header with Progress */}
        <BookingHeader
          image={details.headerImage}
          step={currentBooking.step}
          totalSteps={4}
        />

        {/* Traveler Details */}
        <TravelerDetailsForm
          travelerDetails={currentBooking.travelerDetails}
          onUpdate={updateTraveler}
        />

        {/* Date Selection */}
        <DateSelector
          selectedDates={currentBooking.dates}
          onDatesChange={updateBookingDates}
        />

        {/* Accommodation */}
        <AccommodationSelector
          accommodations={details.accommodations}
          selected={currentBooking.accommodation}
          onSelect={chooseAccommodation}
        />

        {/* Booking Summary */}
        <BookingSummary
          accommodation={currentBooking.accommodation}
          dates={currentBooking.dates}
          guests={currentBooking.guests}
          nights={7}
        />

        {/* Payment Method */}
        <PaymentMethodSelector
          methods={details.paymentMethods}
          selected={currentBooking.paymentMethod}
          onSelect={choosePaymentMethod}
        />

        {/* Terms & Conditions */}
        <TermsCheckbox
          agreed={currentBooking.agreedToTerms}
          onToggle={agreeToTerms}
        />

        {/* Book & Pay Button */}
        <BookPayButton
          onPress={handleBooking}
          loading={loading}
          disabled={!canSubmit}
        />

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingPage;
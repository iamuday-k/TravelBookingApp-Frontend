import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const DateSelector = ({ selectedDates, onDatesChange }) => {
  console.log('📅 Rendering DateSelector');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const isSelected = (day) => {
    if (!day) return false;
    if (selectedRange.start && selectedRange.end) {
      return day >= selectedRange.start && day <= selectedRange.end;
    }
    return day === selectedRange.start;
  };

  const handleDayPress = (day) => {
    console.log('📅 Day selected:', day);
    if (!selectedRange.start || selectedRange.end) {
      const newRange = { start: day, end: null };
      setSelectedRange(newRange);
      onDatesChange(newRange);
    } else {
      const start = Math.min(selectedRange.start, day);
      const end = Math.max(selectedRange.start, day);
      const newRange = { start, end };
      setSelectedRange(newRange);
      onDatesChange(newRange);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-6">Select Dates</Text>

      {/* Month Navigator */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Feather name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Feather name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View className="bg-gray-800 rounded-2xl p-4">
        {/* Day Headers */}
        <View className="flex-row mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <View key={i} className="flex-1 items-center">
              <Text className="text-gray-400 text-xs">{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap">
          {[...emptyDays, ...days].map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => day && handleDayPress(day)}
              disabled={!day}
              className="w-[14.28%] aspect-square items-center justify-center"
              activeOpacity={0.7}
            >
              <View
                className={`w-10 h-10 items-center justify-center rounded-lg ${
                  isSelected(day) ? 'bg-yellow-500' : ''
                }`}
              >
                <Text className={`${day ? 'text-white' : 'text-transparent'} text-sm`}>
                  {day || ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DateSelector;
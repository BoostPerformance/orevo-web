'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format, isBefore, startOfToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  width?: string;
  title: string;
}

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '  날짜 선택',
  minDate = startOfToday(),
  width = 'w-full',
  title,
}) => {
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelected(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDaySelect = (date: Date | undefined) => {
    if (date && !isBefore(date, startOfToday())) {
      setSelected(date);
      if (onChange) {
        onChange(date.toISOString());
      }
      setIsCalendarOpen(false);
    }
  };

  const disabledDays = { before: startOfToday() };

  return (
    <div className="relative" ref={calendarRef}>
      <label className="block mb-2 lg:text-1.25-500 xs:text-1-500">
        {title} <span className="text-red-500">*</span>
      </label>
      <div className={`relative ${width}`}>
        <input
          type="text"
          readOnly
          value={selected ? format(selected, 'PPP', { locale: ko }) : ''}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="lg:w-[13rem] xs:w-[8rem] h-[2rem] mr-2 p-2 border rounded cursor-pointer focus:ring-2 focus:ring-green focus:border-transparent pr-10 text-1.125-500 placeholder:text-1-500 sm:w-[8rem] sm:h-[1.5rem]"
          placeholder={placeholder}
        />
        <div className="absolute lg:right-1 top-3 xs:left-[8.5rem] transform-translate-y-1/2 text-gray-400">
          <CalendarIcon />
        </div>
      </div>
      {isCalendarOpen && (
        <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            locale={ko}
            fromDate={minDate}
            disabled={disabledDays}
            className="p-3"
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

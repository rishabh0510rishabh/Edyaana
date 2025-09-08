import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamCalendar = ({ selectedDate, onDateSelect, exams, filters }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days?.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days?.push({ date, isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingDays = 42 - days?.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days?.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getExamsForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return exams?.filter(exam => exam?.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

  const subjectColors = {
    'Mathematics': 'bg-blue-500',
    'Physics': 'bg-green-500',
    'Chemistry': 'bg-purple-500',
    'Biology': 'bg-red-500',
    'English': 'bg-yellow-500',
    'History': 'bg-indigo-500',
    'Geography': 'bg-pink-500',
    'Computer Science': 'bg-cyan-500'
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('day')}
          >
            Day
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week Day Headers */}
        {weekDays?.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-b border-border">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days?.map((dayObj, index) => {
          const dayExams = getExamsForDate(dayObj?.date);
          const isCurrentMonth = dayObj?.isCurrentMonth;
          const isTodayDate = isToday(dayObj?.date);
          const isSelectedDate = isSelected(dayObj?.date);

          return (
            <div
              key={index}
              className={`
                min-h-24 p-2 border border-border cursor-pointer transition-all duration-200
                ${isCurrentMonth ? 'bg-card hover:bg-muted' : 'bg-muted/50'}
                ${isTodayDate ? 'ring-2 ring-primary' : ''}
                ${isSelectedDate ? 'bg-primary/10' : ''}
              `}
              onClick={() => onDateSelect(dayObj?.date)}
            >
              <div className={`
                text-sm font-medium mb-1
                ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                ${isTodayDate ? 'text-primary font-semibold' : ''}
              `}>
                {dayObj?.date?.getDate()}
              </div>
              {/* Exam Indicators */}
              <div className="space-y-1">
                {dayExams?.slice(0, 3)?.map((exam, examIndex) => (
                  <div
                    key={examIndex}
                    className={`
                      text-xs px-1 py-0.5 rounded text-white truncate
                      ${subjectColors?.[exam?.subject] || 'bg-gray-500'}
                    `}
                    title={`${exam?.subject} - ${exam?.time} - ${exam?.venue}`}
                  >
                    {exam?.subject}
                  </div>
                ))}
                {dayExams?.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayExams?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">Subject Legend:</span>
            <div className="flex items-center space-x-3">
              {Object.entries(subjectColors)?.slice(0, 4)?.map(([subject, color]) => (
                <div key={subject} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded ${color}`}></div>
                  <span className="text-xs text-muted-foreground">{subject}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Click on a date to view exam details
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;
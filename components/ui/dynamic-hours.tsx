'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
  opens?: string;
  closes?: string;
}

const businessHours: BusinessHours[] = [
  { day: 'Monday', hours: 'CLOSED', isOpen: false },
  { day: 'Tuesday', hours: 'CLOSED', isOpen: false },
  { day: 'Wednesday', hours: '8AM-2PM', isOpen: true, opens: '08:00', closes: '14:00' },
  { day: 'Thursday', hours: '8AM-2PM', isOpen: true, opens: '08:00', closes: '14:00' },
  { day: 'Friday', hours: '8AM-5PM', isOpen: true, opens: '08:00', closes: '17:00' },
  { day: 'Saturday', hours: '8AM-2PM', isOpen: true, opens: '08:00', closes: '14:00' },
  { day: 'Sunday', hours: '8:30AM-12:30PM', isOpen: true, opens: '08:30', closes: '12:30' },
];

function getCurrentDay(): number {
  return new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
}

function isCurrentlyOpen(): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert to HHMM format

  // Map Sunday (0) to our array index (6), Monday (1) to (0), etc.
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
  const todayHours = businessHours[dayIndex];

  if (!todayHours.isOpen || !todayHours.opens || !todayHours.closes) {
    return false;
  }

  // Convert opens/closes to HHMM format
  const [openHour, openMin] = todayHours.opens.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.closes.split(':').map(Number);
  const openTime = openHour * 100 + openMin;
  const closeTime = closeHour * 100 + closeMin;

  return currentTime >= openTime && currentTime <= closeTime;
}

function getTodayHours(): BusinessHours {
  const currentDay = getCurrentDay();
  // Map Sunday (0) to our array index (6), Monday (1) to (0), etc.
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
  return businessHours[dayIndex];
}

interface DynamicHoursProps {
  variant?: 'full' | 'today-only' | 'compact';
  className?: string;
}

export function DynamicHours({ variant = 'today-only', className }: DynamicHoursProps) {
  const todayHours = getTodayHours();
  const isOpen = isCurrentlyOpen();
  const currentDay = getCurrentDay();

  if (variant === 'today-only') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Clock className="h-5 w-5 text-primary" />
        <span className="text-sm">
          Today ({todayHours.day}): {todayHours.hours}
          {todayHours.isOpen && (
            <span
              className={cn(
                'ml-2 px-2 py-0.5 rounded-full text-xs font-medium',
                isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              )}
            >
              {isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          )}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    const openDays = businessHours.filter((day) => day.isOpen);
    const compactHours = `${openDays[0].day.slice(0, 3)}-${openDays[1].day.slice(0, 3)}: ${openDays[0].hours} | ${openDays[2].day.slice(0, 3)}: ${openDays[2].hours} | ${openDays[3].day.slice(0, 3)}: ${openDays[3].hours} | ${openDays[4].day.slice(0, 3)}: ${openDays[4].hours}`;

    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Clock className="h-5 w-5 text-primary" />
        <span className="text-sm">{compactHours}</span>
      </div>
    );
  }

  // Full variant - shows all days with current day highlighted
  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="font-semibold flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Hours
      </h4>
      <ul className="space-y-2 text-sm">
        {businessHours.map((day, index) => {
          // Map our array index back to day of week (0 = Monday in our array, 1 in Date)
          const dayOfWeek = index === 6 ? 0 : index + 1;
          const isToday = currentDay === dayOfWeek;

          return (
            <li
              key={day.day}
              className={cn(
                'flex justify-between items-center py-1 px-2 rounded',
                isToday && 'bg-primary/10 font-medium text-primary'
              )}
            >
              <span>{day.day}:</span>
              <span
                className={cn(
                  day.isOpen ? 'text-foreground' : 'text-red-600',
                  isToday && 'font-semibold'
                )}
              >
                {day.hours}
                {isToday && day.isOpen && (
                  <span
                    className={cn(
                      'ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium',
                      isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    )}
                  >
                    {isOpen ? 'OPEN' : 'CLOSED'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Helper function to get next open day
export function getNextOpenDay(): { day: string; hours: string } | null {
  const currentDay = getCurrentDay();

  // Look for next open day starting from tomorrow
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i) % 7;
    const dayIndex = checkDay === 0 ? 6 : checkDay - 1;
    const dayHours = businessHours[dayIndex];

    if (dayHours.isOpen) {
      return {
        day: dayHours.day,
        hours: dayHours.hours,
      };
    }
  }

  return null;
}

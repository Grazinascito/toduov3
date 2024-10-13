"use client";

import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

type DatePickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`col-span-3 justify-start text-left font-normal ${
            !selectedDate && "text-muted-foreground"
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => onDateChange(date || null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

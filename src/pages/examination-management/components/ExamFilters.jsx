import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ExamFilters = ({ filters, onFilterChange, onAddExam, onBulkImport }) => {
  const semesterOptions = [
    { value: 'all', label: 'All Semesters' },
    { value: 'semester-1', label: 'Semester 1' },
    { value: 'semester-2', label: 'Semester 2' },
    { value: 'semester-3', label: 'Semester 3' },
    { value: 'semester-4', label: 'Semester 4' },
    { value: 'semester-5', label: 'Semester 5' },
    { value: 'semester-6', label: 'Semester 6' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'computer-science', label: 'Computer Science' }
  ];

  const examTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'midterm', label: 'Midterm' },
    { value: 'final', label: 'Final Exam' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'practical', label: 'Practical' },
    { value: 'viva', label: 'Viva Voce' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Examination Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkImport}
            iconName="Upload"
            iconPosition="left"
          >
            Bulk Import
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onAddExam}
            iconName="Plus"
            iconPosition="left"
          >
            Schedule Exam
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Semester Filter */}
        <Select
          label="Semester"
          options={semesterOptions}
          value={filters?.semester}
          onChange={(value) => handleFilterChange('semester', value)}
          className="w-full"
        />

        {/* Subject Filter */}
        <Select
          label="Subject"
          options={subjectOptions}
          value={filters?.subject}
          onChange={(value) => handleFilterChange('subject', value)}
          searchable
          className="w-full"
        />

        {/* Exam Type Filter */}
        <Select
          label="Exam Type"
          options={examTypeOptions}
          value={filters?.examType}
          onChange={(value) => handleFilterChange('examType', value)}
          className="w-full"
        />

        {/* Date Range From */}
        <Input
          label="From Date"
          type="date"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          className="w-full"
        />

        {/* Date Range To */}
        <Input
          label="To Date"
          type="date"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          className="w-full"
        />

        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-1">Search</label>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search exams..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-medium text-foreground mr-2">Quick Filters:</span>
        <Button
          variant={filters?.quickFilter === 'today' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', 'today')}
        >
          Today
        </Button>
        <Button
          variant={filters?.quickFilter === 'thisWeek' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', 'thisWeek')}
        >
          This Week
        </Button>
        <Button
          variant={filters?.quickFilter === 'thisMonth' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', 'thisMonth')}
        >
          This Month
        </Button>
        <Button
          variant={filters?.quickFilter === 'upcoming' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', 'upcoming')}
        >
          Upcoming
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange({
            semester: 'all',
            subject: 'all',
            examType: 'all',
            dateFrom: '',
            dateTo: '',
            search: '',
            quickFilter: ''
          })}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default ExamFilters;
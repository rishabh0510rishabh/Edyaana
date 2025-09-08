import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FeeFilters = ({ onFiltersChange, totalRecords }) => {
  const [filters, setFilters] = useState({
    search: '',
    program: '',
    status: '',
    dateRange: '',
    amountRange: ''
  });

  const programOptions = [
    { value: '', label: 'All Programs' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'business-admin', label: 'Business Administration' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Liberal Arts' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'paid', label: 'Fully Paid' },
    { value: 'partial', label: 'Partially Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const amountRangeOptions = [
    { value: '', label: 'All Amounts' },
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      program: '',
      status: '',
      dateRange: '',
      amountRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
            {totalRecords} records
          </span>
        </div>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <Icon name="X" size={16} className="mr-2" />
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2">
          <Input
            type="search"
            placeholder="Search by student name or ID..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Select Program"
          options={programOptions}
          value={filters?.program}
          onChange={(value) => handleFilterChange('program', value)}
        />

        <Select
          placeholder="Payment Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          placeholder="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          placeholder="Amount Range"
          options={amountRangeOptions}
          value={filters?.amountRange}
          onChange={(value) => handleFilterChange('amountRange', value)}
        />
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.search && (
            <div className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="text-muted-foreground mr-2">Search:</span>
              <span className="font-medium">{filters?.search}</span>
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          
          {filters?.program && (
            <div className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="text-muted-foreground mr-2">Program:</span>
              <span className="font-medium">
                {programOptions?.find(opt => opt?.value === filters?.program)?.label}
              </span>
              <button
                onClick={() => handleFilterChange('program', '')}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}

          {filters?.status && (
            <div className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="text-muted-foreground mr-2">Status:</span>
              <span className="font-medium">
                {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
              <button
                onClick={() => handleFilterChange('status', '')}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeeFilters;
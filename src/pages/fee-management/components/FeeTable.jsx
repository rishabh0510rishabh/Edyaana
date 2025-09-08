import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeeTable = ({ data, onPaymentRecord, onViewHistory, onGenerateReceipt }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return data;

    return [...data]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc'
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      if (typeof aValue === 'number') {
        return sortConfig?.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedData?.map(row => row?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows?.filter(rowId => rowId !== id));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'paid': { color: 'bg-success text-success-foreground', label: 'Fully Paid' },
      'partial': { color: 'bg-warning text-warning-foreground', label: 'Partial' },
      'pending': { color: 'bg-error text-error-foreground', label: 'Pending' },
      'overdue': { color: 'bg-destructive text-destructive-foreground', label: 'Overdue' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header Actions */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Fee Records</h3>
          {selectedRows?.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedRows?.length} selected
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedRows?.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export Selected
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Bulk Payment
              </Button>
            </>
          )}
          
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Advanced Filter
          </Button>
          
          <Button size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Record Payment
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === paginatedData?.length && paginatedData?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('studentName')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Student</span>
                  {getSortIcon('studentName')}
                </button>
              </th>
              
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('program')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Program</span>
                  {getSortIcon('program')}
                </button>
              </th>
              
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('totalFees')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Total Fees</span>
                  {getSortIcon('totalFees')}
                </button>
              </th>
              
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('paidAmount')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Paid</span>
                  {getSortIcon('paidAmount')}
                </button>
              </th>
              
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('pendingAmount')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Pending</span>
                  {getSortIcon('pendingAmount')}
                </button>
              </th>
              
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Last Payment</span>
              </th>
              
              <th className="text-center p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {paginatedData?.map((row) => (
              <tr key={row?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(row?.id)}
                    onChange={(e) => handleSelectRow(row?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {row?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{row?.studentName}</div>
                      <div className="text-sm text-muted-foreground">{row?.studentId}</div>
                    </div>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="text-sm text-foreground">{row?.program}</div>
                  <div className="text-xs text-muted-foreground">{row?.semester}</div>
                </td>
                
                <td className="p-4">
                  <div className="font-medium text-foreground">₹{row?.totalFees?.toLocaleString('en-IN')}</div>
                </td>
                
                <td className="p-4">
                  <div className="font-medium text-success">₹{row?.paidAmount?.toLocaleString('en-IN')}</div>
                </td>
                
                <td className="p-4">
                  <div className="font-medium text-error">₹{row?.pendingAmount?.toLocaleString('en-IN')}</div>
                </td>
                
                <td className="p-4">
                  {getStatusBadge(row?.status)}
                </td>
                
                <td className="p-4">
                  <div className="text-sm text-foreground">{row?.lastPaymentDate}</div>
                  <div className="text-xs text-muted-foreground">₹{row?.lastPaymentAmount?.toLocaleString('en-IN')}</div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPaymentRecord(row)}
                      className="h-8 w-8"
                    >
                      <Icon name="CreditCard" size={14} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewHistory(row)}
                      className="h-8 w-8"
                    >
                      <Icon name="History" size={14} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onGenerateReceipt(row)}
                      className="h-8 w-8"
                    >
                      <Icon name="FileText" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeeTable;
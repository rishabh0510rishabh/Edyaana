import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LibraryStatusCard = () => {
  const libraryData = {
    booksIssued: 3,
    maxLimit: 5,
    overdueBooks: 1,
    issuedBooks: [
      {
        id: "LB001",
        title: "Introduction to Machine Learning",
        author: "Tom Mitchell",
        issueDate: "15-10-2024",
        dueDate: "15-11-2024",
        status: "active",
        renewals: 1,
        maxRenewals: 2
      },
      {
        id: "LB002",
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        issueDate: "20-10-2024",
        dueDate: "20-11-2024",
        status: "active",
        renewals: 0,
        maxRenewals: 2
      },
      {
        id: "LB003",
        title: "Software Engineering Principles",
        author: "Ian Sommerville",
        issueDate: "25-09-2024",
        dueDate: "25-10-2024",
        status: "overdue",
        renewals: 2,
        maxRenewals: 2,
        overdueDays: 13
      }
    ],
    recentActivity: [
      { action: "Returned", book: "Computer Networks", date: "01-11-2024" },
      { action: "Issued", book: "Database System Concepts", date: "20-10-2024" },
      { action: "Renewed", book: "Introduction to Machine Learning", date: "15-10-2024" }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'overdue': return 'text-error bg-error/10 border-error/20';
      case 'due-soon': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate.split('-').reverse().join('-'));
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Library Status</h3>
        <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
          Search Books
        </Button>
      </div>
      {/* Library Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary">{libraryData?.booksIssued}</div>
          <div className="text-xs text-muted-foreground">Books Issued</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-muted-foreground">{libraryData?.maxLimit - libraryData?.booksIssued}</div>
          <div className="text-xs text-muted-foreground">Available Slots</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-error">{libraryData?.overdueBooks}</div>
          <div className="text-xs text-muted-foreground">Overdue</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{libraryData?.maxLimit}</div>
          <div className="text-xs text-muted-foreground">Max Limit</div>
        </div>
      </div>
      {/* Issued Books */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Book" size={16} className="mr-2 text-primary" />
          Currently Issued Books
        </h4>
        <div className="space-y-3">
          {libraryData?.issuedBooks?.map((book) => {
            const daysUntilDue = getDaysUntilDue(book?.dueDate);
            const bookStatus = book?.status === 'overdue' ? 'overdue' : 
                              daysUntilDue <= 3 ? 'due-soon' : 'active';
            
            return (
              <div key={book?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-medium text-foreground">{book?.title}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(bookStatus)}`}>
                        {book?.status === 'overdue' ? `Overdue (${book?.overdueDays} days)` :
                         daysUntilDue <= 3 ? `Due in ${daysUntilDue} days` : 'Active'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">by {book?.author}</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Issue Date:</span> {book?.issueDate}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span> {book?.dueDate}
                      </div>
                      <div>
                        <span className="font-medium">Book ID:</span> {book?.id}
                      </div>
                      <div>
                        <span className="font-medium">Renewals:</span> {book?.renewals}/{book?.maxRenewals}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {book?.renewals < book?.maxRenewals && book?.status !== 'overdue' && (
                      <Button variant="outline" size="sm">
                        Renew
                      </Button>
                    )}
                    <Button variant="default" size="sm">
                      Return
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Overdue Alert */}
      {libraryData?.overdueBooks > 0 && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <div>
              <div className="text-sm font-medium text-foreground">Overdue Books Alert</div>
              <div className="text-sm text-muted-foreground">
                You have {libraryData?.overdueBooks} overdue book(s). Please return them to avoid penalties.
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Recent Activity */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-primary" />
          Recent Activity
        </h4>
        <div className="space-y-3">
          {libraryData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity?.action === 'Returned' ? 'bg-success' :
                  activity?.action === 'Issued' ? 'bg-primary' : 'bg-warning'
                }`} />
                <div>
                  <span className="text-sm font-medium text-foreground">{activity?.action}</span>
                  <span className="text-sm text-muted-foreground ml-2">{activity?.book}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{activity?.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryStatusCard;
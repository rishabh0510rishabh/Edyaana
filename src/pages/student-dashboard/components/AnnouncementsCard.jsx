import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnouncementsCard = () => {
  const [filter, setFilter] = useState('all');
  
  const announcementsData = [
    {
      id: "ANN001",
      title: "Winter Break Schedule Announced",
      content: `The winter break will commence from December 25, 2024, and classes will resume on January 8, 2025. All students are advised to complete their pending assignments before the break.\n\nLibrary will remain closed during the break period. Emergency contact numbers will be available on the notice board.`,
      category: "academic",
      priority: "high",
      date: "07-12-2024",
      time: "10:30 AM",
      author: "Academic Office",
      isRead: false,
      attachments: ["winter_schedule.pdf"]
    },
    {
      id: "ANN002",
      title: "Fee Payment Deadline Extended",
      content: `Due to technical issues with the payment gateway, the fee payment deadline has been extended to December 20, 2024. Students can now pay their fees without any late penalty until the new deadline.\n\nFor any payment related queries, contact the accounts department.`,
      category: "finance",
      priority: "medium",
      date: "06-12-2024",
      time: "02:15 PM",
      author: "Accounts Department",
      isRead: true,
      attachments: []
    },
    {
      id: "ANN003",
      title: "Library New Books Arrival",
      content: `The library has received new books on Machine Learning, Data Science, and Software Engineering. Students can check the availability and reserve books through the online portal.\n\nNew books section is located on the second floor.`,
      category: "library",
      priority: "low",
      date: "05-12-2024",
      time: "11:45 AM",
      author: "Library Department",
      isRead: true,
      attachments: ["new_books_list.pdf"]
    },
    {
      id: "ANN004",
      title: "Hostel Maintenance Notice",
      content: `Scheduled maintenance work will be carried out in hostel blocks A and B on December 10, 2024, from 9:00 AM to 5:00 PM. Water supply may be interrupted during this period.\n\nAlternate arrangements have been made in block C common area.`,
      category: "hostel",
      priority: "medium",
      date: "04-12-2024",
      time: "04:20 PM",
      author: "Hostel Administration",
      isRead: false,
      attachments: []
    },
    {
      id: "ANN005",
      title: "Career Guidance Workshop",
      content: `A career guidance workshop will be conducted on December 12, 2024, from 2:00 PM to 4:00 PM in the main auditorium. Industry experts will share insights on job market trends and interview preparation.\n\nRegistration is mandatory. Limited seats available.`,
      category: "events",
      priority: "high",
      date: "03-12-2024",
      time: "09:00 AM",
      author: "Placement Cell",
      isRead: true,
      attachments: ["workshop_details.pdf"]
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'text-primary bg-primary/10 border-primary/20';
      case 'finance': return 'text-success bg-success/10 border-success/20';
      case 'library': return 'text-accent bg-accent/10 border-accent/20';
      case 'hostel': return 'text-warning bg-warning/10 border-warning/20';
      case 'events': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-muted-foreground bg-muted/50 border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredAnnouncements = announcementsData?.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !announcement?.isRead;
    return announcement?.category === filter;
  });

  const unreadCount = announcementsData?.filter(ann => !ann?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Announcements</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
          Notifications
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: announcementsData?.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'academic', label: 'Academic', count: announcementsData?.filter(a => a?.category === 'academic')?.length },
          { key: 'finance', label: 'Finance', count: announcementsData?.filter(a => a?.category === 'finance')?.length },
          { key: 'events', label: 'Events', count: announcementsData?.filter(a => a?.category === 'events')?.length }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === tab?.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tab?.label} ({tab?.count})
          </button>
        ))}
      </div>
      {/* Announcements List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAnnouncements?.map((announcement) => (
          <div 
            key={announcement?.id} 
            className={`border rounded-lg p-4 transition-all hover:shadow-sm ${
              announcement?.isRead ? 'border-border bg-card' : 'border-primary/20 bg-primary/5'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className={`font-medium ${announcement?.isRead ? 'text-foreground' : 'text-foreground font-semibold'}`}>
                    {announcement?.title}
                  </h4>
                  {!announcement?.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(announcement?.category)}`}>
                    {announcement?.category?.charAt(0)?.toUpperCase() + announcement?.category?.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(announcement?.priority)}`}>
                    {announcement?.priority?.charAt(0)?.toUpperCase() + announcement?.priority?.slice(1)}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground mb-3">
                  {announcement?.content?.split('\n')?.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < announcement?.content?.split('\n')?.length - 1 && <br />}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{announcement?.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{announcement?.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{announcement?.time}</span>
                    </span>
                  </div>
                  
                  {announcement?.attachments?.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Paperclip" size={12} />
                      <span>{announcement?.attachments?.length} attachment(s)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                {announcement?.attachments?.length > 0 && (
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                )}
                {!announcement?.isRead && (
                  <Button variant="ghost" size="sm" iconName="Check">
                    Mark Read
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAnnouncements?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No announcements found for the selected filter.</p>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread announcements` : 'All caught up!'}
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="CheckCheck">
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" iconName="Archive">
              Archive Old
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "pay-fees",
      title: "Pay Fees",
      description: "Make fee payments online",
      icon: "CreditCard",
      color: "text-success bg-success/10 hover:bg-success/20",
      action: () => navigate('/fee-management'),
      badge: "Due Soon"
    },
    {
      id: "view-results",
      title: "View Results",
      description: "Check exam results and grades",
      icon: "FileText",
      color: "text-primary bg-primary/10 hover:bg-primary/20",
      action: () => navigate('/examination-management'),
      badge: null
    },
    {
      id: "download-documents",
      title: "Documents",
      description: "Download certificates and transcripts",
      icon: "Download",
      color: "text-secondary bg-secondary/10 hover:bg-secondary/20",
      action: () => console.log('Download documents'),
      badge: "3 Available"
    },
    {
      id: "update-profile",
      title: "Update Profile",
      description: "Edit personal information",
      icon: "User",
      color: "text-accent bg-accent/10 hover:bg-accent/20",
      action: () => console.log('Update profile'),
      badge: null
    },
    {
      id: "library-search",
      title: "Library Search",
      description: "Search and reserve books",
      icon: "Search",
      color: "text-warning bg-warning/10 hover:bg-warning/20",
      action: () => console.log('Library search'),
      badge: null
    },
    {
      id: "support-ticket",
      title: "Support",
      description: "Get help and raise tickets",
      icon: "HelpCircle",
      color: "text-muted-foreground bg-muted hover:bg-muted/80",
      action: () => console.log('Support ticket'),
      badge: null
    }
  ];

  const recentActions = [
    {
      action: "Downloaded transcript",
      time: "2 hours ago",
      icon: "Download",
      color: "text-success"
    },
    {
      action: "Paid semester fees",
      time: "1 day ago",
      icon: "CreditCard",
      color: "text-primary"
    },
    {
      action: "Updated contact information",
      time: "3 days ago",
      icon: "User",
      color: "text-secondary"
    },
    {
      action: "Reserved library book",
      time: "5 days ago",
      icon: "Book",
      color: "text-warning"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
          More
        </Button>
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`relative p-4 rounded-lg border border-border transition-all duration-200 hover:shadow-sm ${action?.color}`}
          >
            {action?.badge && (
              <div className="absolute -top-2 -right-2 px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
                {action?.badge}
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-current/10 flex items-center justify-center">
                <Icon name={action?.icon} size={24} className="text-current" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{action?.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{action?.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Shortcuts Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={16} className="mr-2 text-primary" />
          Shortcuts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="justify-start h-12" 
            iconName="Calendar"
            iconPosition="left"
            onClick={() => console.log('View timetable')}
          >
            <div className="text-left">
              <div className="text-sm font-medium">View Timetable</div>
              <div className="text-xs text-muted-foreground">Class schedule</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-12" 
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => console.log('Contact faculty')}
          >
            <div className="text-left">
              <div className="text-sm font-medium">Contact Faculty</div>
              <div className="text-xs text-muted-foreground">Send message</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-12" 
            iconName="MapPin"
            iconPosition="left"
            onClick={() => console.log('Campus map')}
          >
            <div className="text-left">
              <div className="text-sm font-medium">Campus Map</div>
              <div className="text-xs text-muted-foreground">Find locations</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-12" 
            iconName="Wifi"
            iconPosition="left"
            onClick={() => console.log('WiFi access')}
          >
            <div className="text-left">
              <div className="text-sm font-medium">WiFi Access</div>
              <div className="text-xs text-muted-foreground">Network details</div>
            </div>
          </Button>
        </div>
      </div>
      {/* Recent Actions */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-primary" />
          Recent Actions
        </h4>
        <div className="space-y-3">
          {recentActions?.map((recent, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${recent?.color}`}>
                <Icon name={recent?.icon} size={16} className="text-current" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{recent?.action}</div>
                <div className="text-xs text-muted-foreground">{recent?.time}</div>
              </div>
              <Button variant="ghost" size="sm" iconName="RotateCcw">
                Repeat
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Phone" size={16} className="mr-2 text-error" />
          Emergency Contacts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg">
            <div>
              <div className="text-sm font-medium text-foreground">Security</div>
              <div className="text-xs text-muted-foreground">24/7 Campus Security</div>
            </div>
            <Button variant="outline" size="sm" iconName="Phone">
              Call
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
            <div>
              <div className="text-sm font-medium text-foreground">Medical</div>
              <div className="text-xs text-muted-foreground">Campus Health Center</div>
            </div>
            <Button variant="outline" size="sm" iconName="Phone">
              Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;
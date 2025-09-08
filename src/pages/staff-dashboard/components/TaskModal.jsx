import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskModal = ({ task, isOpen, onClose, onUpdateStatus, onAssignTask }) => {
  if (!isOpen || !task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1100 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Task Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-foreground pr-4">{task?.title}</h3>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium border
                  ${getPriorityColor(task?.priority)}
                `}>
                  {task?.priority} priority
                </span>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${getStatusColor(task?.status)}
                `}>
                  {task?.status}
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground">{task?.description}</p>
          </div>

          {/* Task Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <span className={`text-sm font-medium ${isOverdue ? 'text-error' : 'text-foreground'}`}>
                  {new Date(task.dueDate)?.toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Assigned by:</span>
                <span className="text-sm font-medium text-foreground">{task?.assignedBy}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium text-foreground">{task?.category}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(task.createdAt)?.toLocaleDateString()}
                </span>
              </div>
              
              {task?.progress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress:</span>
                    <span className="text-sm font-medium text-foreground">{task?.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${task?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          {task?.notes && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Notes:</h4>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">{task?.notes}</p>
              </div>
            </div>
          )}

          {/* Attachments */}
          {task?.attachments && task?.attachments?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Attachments:</h4>
              <div className="space-y-2">
                {task?.attachments?.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{attachment?.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Icon name="Download" size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2">
            {task?.status !== 'completed' && (
              <Button
                variant="default"
                onClick={() => onUpdateStatus(task?.id, 'completed')}
              >
                <Icon name="Check" size={16} className="mr-2" />
                Mark Complete
              </Button>
            )}
            
            {task?.status === 'pending' && (
              <Button
                variant="outline"
                onClick={() => onUpdateStatus(task?.id, 'in-progress')}
              >
                <Icon name="Play" size={16} className="mr-2" />
                Start Task
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => onAssignTask(task)}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Reassign
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
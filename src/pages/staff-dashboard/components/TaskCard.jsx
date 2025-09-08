import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onToggleComplete, onViewDetails }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle2';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';

  return (
    <div className={`
      bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md
      ${task?.status === 'completed' ? 'opacity-75' : ''}
      ${isOverdue ? 'border-error/30 bg-error/5' : ''}
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task?.id)}
            className={`
              mt-1 transition-all duration-200 hover:scale-110
              ${task?.status === 'completed' ? 'text-success' : 'text-muted-foreground hover:text-primary'}
            `}
          >
            <Icon 
              name={getStatusIcon(task?.status)} 
              size={20}
              className={task?.status === 'completed' ? 'fill-current' : ''}
            />
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className={`
              text-sm font-medium mb-1 transition-all duration-200
              ${task?.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}
            `}>
              {task?.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {task?.description}
            </p>
            
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} className="text-muted-foreground" />
                <span className={`${isOverdue ? 'text-error font-medium' : 'text-muted-foreground'}`}>
                  Due: {new Date(task.dueDate)?.toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="User" size={12} className="text-muted-foreground" />
                <span className="text-muted-foreground">{task?.assignedBy}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium border
            ${getPriorityColor(task?.priority)}
          `}>
            {task?.priority}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => onViewDetails(task)}
          >
            <Icon name="MoreVertical" size={14} />
          </Button>
        </div>
      </div>
      {task?.category && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Icon name="Tag" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{task?.category}</span>
          </div>
          
          {task?.progress && (
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${task?.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{task?.progress}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTile = ({ tile }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (tile?.path) {
      navigate(tile?.path);
    } else if (tile?.action) {
      tile?.action();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-card border border-border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200
          ${tile?.color} group-hover:scale-110
        `}>
          <Icon name={tile?.icon} size={28} className="text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {tile?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tile?.description}
          </p>
        </div>
        
        {tile?.badge && (
          <div className="flex items-center space-x-2">
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${tile?.badge?.type === 'count' ? 'bg-primary text-primary-foreground' : ''}
              ${tile?.badge?.type === 'status' ? 'bg-success text-success-foreground' : ''}
              ${tile?.badge?.type === 'warning' ? 'bg-warning text-warning-foreground' : ''}
            `}>
              {tile?.badge?.text}
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">Open</span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default QuickAccessTile;
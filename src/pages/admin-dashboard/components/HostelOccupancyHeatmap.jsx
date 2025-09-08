import React from 'react';
import Icon from '../../../components/AppIcon';

const HostelOccupancyHeatmap = () => {
  const hostelData = [
    { name: "Block A", floors: 4, totalRooms: 120, occupiedRooms: 108, occupancyRate: 90 },
    { name: "Block B", floors: 3, totalRooms: 90, occupiedRooms: 72, occupancyRate: 80 },
    { name: "Block C", floors: 5, totalRooms: 150, occupiedRooms: 135, occupancyRate: 90 },
    { name: "Block D", floors: 3, totalRooms: 90, occupiedRooms: 63, occupancyRate: 70 },
    { name: "Block E", floors: 4, totalRooms: 120, occupiedRooms: 96, occupancyRate: 80 },
    { name: "Block F", floors: 2, totalRooms: 60, occupiedRooms: 57, occupancyRate: 95 }
  ];

  const getOccupancyColor = (rate) => {
    if (rate >= 90) return 'bg-success';
    if (rate >= 75) return 'bg-warning';
    if (rate >= 50) return 'bg-accent';
    return 'bg-error';
  };

  const getOccupancyTextColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 75) return 'text-warning';
    if (rate >= 50) return 'text-accent';
    return 'text-error';
  };

  const totalRooms = hostelData?.reduce((sum, block) => sum + block?.totalRooms, 0);
  const totalOccupied = hostelData?.reduce((sum, block) => sum + block?.occupiedRooms, 0);
  const overallOccupancy = Math.round((totalOccupied / totalRooms) * 100);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Hostel Occupancy Heatmap</h3>
          <p className="text-sm text-muted-foreground">Real-time room occupancy across blocks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{overallOccupancy}%</div>
            <div className="text-xs text-muted-foreground">Overall Occupancy</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {hostelData?.map((block, index) => (
          <div 
            key={index}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={20} className="text-muted-foreground" />
                <h4 className="font-medium text-foreground">{block?.name}</h4>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOccupancyColor(block?.occupancyRate)} text-white`}>
                {block?.occupancyRate}%
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Floors:</span>
                <span className="text-foreground">{block?.floors}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Rooms:</span>
                <span className="text-foreground">{block?.totalRooms}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Occupied:</span>
                <span className={getOccupancyTextColor(block?.occupancyRate)}>
                  {block?.occupiedRooms}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available:</span>
                <span className="text-foreground">{block?.totalRooms - block?.occupiedRooms}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getOccupancyColor(block?.occupancyRate)}`}
                  style={{ width: `${block?.occupancyRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">90%+ Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">75-89% Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-muted-foreground">50-74% Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-muted-foreground">&lt;50% Occupied</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default HostelOccupancyHeatmap;
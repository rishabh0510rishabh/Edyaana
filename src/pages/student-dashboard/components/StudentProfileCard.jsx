import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StudentProfileCard = () => {
  const studentData = {
    id: "STU2024001",
    name: "Sarah Johnson",
    email: "sarah.johnson@edyaana.edu",
    phone: "+91 98765 43210",
    course: "Computer Science Engineering",
    semester: "6th Semester",
    year: "3rd Year",
    section: "A",
    rollNumber: "CSE21001",
    admissionDate: "15-08-2021",
    academicStatus: "Active",
    cgpa: 8.7,
    attendance: 92,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={studentData?.profileImage}
              alt={studentData?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              studentData?.academicStatus === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                studentData?.academicStatus === 'Active' ? 'bg-success' : 'bg-warning'
              }`} />
              {studentData?.academicStatus}
            </span>
          </div>
        </div>

        {/* Student Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{studentData?.name}</h2>
              <p className="text-muted-foreground mt-1">{studentData?.course}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-muted-foreground">
                  {studentData?.semester} • {studentData?.year}
                </span>
                <span className="text-sm text-muted-foreground">
                  Section {studentData?.section}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Student ID</div>
              <div className="font-mono text-foreground">{studentData?.id}</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm text-foreground">{studentData?.email}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-sm text-foreground">{studentData?.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Hash" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Roll Number</div>
                <div className="text-sm text-foreground">{studentData?.rollNumber}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Admission Date</div>
                <div className="text-sm text-foreground">{studentData?.admissionDate}</div>
              </div>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{studentData?.cgpa}</div>
              <div className="text-sm text-muted-foreground">CGPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{studentData?.attendance}%</div>
              <div className="text-sm text-muted-foreground">Attendance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
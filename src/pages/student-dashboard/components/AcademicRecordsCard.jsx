import React from 'react';
import Icon from '../../../components/AppIcon';

const AcademicRecordsCard = () => {
  const academicData = {
    currentSemester: {
      semester: "6th Semester",
      subjects: [
        { code: "CS601", name: "Machine Learning", credits: 4, grade: "A", points: 9 },
        { code: "CS602", name: "Database Systems", credits: 3, grade: "A+", points: 10 },
        { code: "CS603", name: "Software Engineering", credits: 4, grade: "B+", points: 8 },
        { code: "CS604", name: "Computer Networks", credits: 3, grade: "A", points: 9 },
        { code: "CS605", name: "Web Technologies", credits: 3, grade: "A+", points: 10 }
      ]
    },
    recentGrades: [
      { subject: "Machine Learning", grade: "A", date: "Nov 15, 2024" },
      { subject: "Database Systems", grade: "A+", date: "Nov 10, 2024" },
      { subject: "Software Engineering", grade: "B+", date: "Nov 8, 2024" }
    ],
    attendance: {
      overall: 92,
      subjects: [
        { name: "Machine Learning", percentage: 95, classes: "19/20" },
        { name: "Database Systems", percentage: 90, classes: "18/20" },
        { name: "Software Engineering", percentage: 88, classes: "22/25" },
        { name: "Computer Networks", percentage: 94, classes: "17/18" }
      ]
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-success bg-success/10';
      case 'A': return 'text-success bg-success/10';
      case 'B+': return 'text-warning bg-warning/10';
      case 'B': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Academic Records</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            Current Semester
          </button>
          <button className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
            All Semesters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Semester Subjects */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="BookOpen" size={16} className="mr-2 text-primary" />
            Current Subjects ({academicData?.currentSemester?.semester})
          </h4>
          <div className="space-y-3">
            {academicData?.currentSemester?.subjects?.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">{subject?.name}</div>
                  <div className="text-xs text-muted-foreground">{subject?.code} • {subject?.credits} Credits</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(subject?.grade)}`}>
                    {subject?.grade}
                  </span>
                  <span className="text-xs text-muted-foreground">{subject?.points}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Calendar" size={16} className="mr-2 text-primary" />
            Attendance Overview
          </h4>
          <div className="space-y-3">
            {academicData?.attendance?.subjects?.map((subject, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{subject?.name}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAttendanceColor(subject?.percentage)}`}>
                    {subject?.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        subject?.percentage >= 90 ? 'bg-success' :
                        subject?.percentage >= 75 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${subject?.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{subject?.classes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Grades */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2 text-primary" />
          Recent Grades
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {academicData?.recentGrades?.map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-foreground">{grade?.subject}</div>
                <div className="text-xs text-muted-foreground">{grade?.date}</div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(grade?.grade)}`}>
                {grade?.grade}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Overall Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">8.7</div>
            <div className="text-xs text-muted-foreground">Current CGPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{academicData?.attendance?.overall}%</div>
            <div className="text-xs text-muted-foreground">Overall Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">17</div>
            <div className="text-xs text-muted-foreground">Credits Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">Subjects</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecordsCard;
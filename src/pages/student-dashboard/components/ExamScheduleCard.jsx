import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamScheduleCard = () => {
  const [selectedMonth, setSelectedMonth] = useState('December');
  
  const examData = {
    upcomingExams: [
      {
        id: "EX001",
        subject: "Machine Learning",
        code: "CS601",
        date: "15-12-2024",
        time: "09:00 AM - 12:00 PM",
        venue: "Hall A - Room 101",
        type: "Theory",
        duration: "3 hours",
        syllabus: "Complete syllabus",
        status: "scheduled"
      },
      {
        id: "EX002",
        subject: "Database Systems",
        code: "CS602",
        date: "18-12-2024",
        time: "02:00 PM - 05:00 PM",
        venue: "Hall B - Room 205",
        type: "Theory",
        duration: "3 hours",
        syllabus: "Chapters 1-8",
        status: "scheduled"
      },
      {
        id: "EX003",
        subject: "Software Engineering Lab",
        code: "CS603L",
        date: "20-12-2024",
        time: "10:00 AM - 01:00 PM",
        venue: "Computer Lab 1",
        type: "Practical",
        duration: "3 hours",
        syllabus: "All lab exercises",
        status: "scheduled"
      },
      {
        id: "EX004",
        subject: "Computer Networks",
        code: "CS604",
        date: "22-12-2024",
        time: "09:00 AM - 12:00 PM",
        venue: "Hall C - Room 301",
        type: "Theory",
        duration: "3 hours",
        syllabus: "Complete syllabus",
        status: "scheduled"
      }
    ],
    completedExams: [
      {
        subject: "Web Technologies",
        date: "25-11-2024",
        grade: "A+",
        marks: "95/100"
      },
      {
        subject: "Data Structures",
        date: "20-11-2024",
        grade: "A",
        marks: "88/100"
      }
    ]
  };

  const getExamTypeColor = (type) => {
    return type === 'Theory' ?'text-primary bg-primary/10 border-primary/20' :'text-success bg-success/10 border-success/20';
  };

  const getDaysUntilExam = (examDate) => {
    const exam = new Date(examDate.split('-').reverse().join('-'));
    const today = new Date();
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days) => {
    if (days <= 3) return 'text-error bg-error/10 border-error/20';
    if (days <= 7) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-muted-foreground bg-muted/50 border-border';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Exam Schedule</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            View Calendar
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Download
          </Button>
        </div>
      </div>
      {/* Exam Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary">{examData?.upcomingExams?.length}</div>
          <div className="text-xs text-muted-foreground">Upcoming Exams</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-success">{examData?.completedExams?.length}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-warning">
            {examData?.upcomingExams?.filter(exam => getDaysUntilExam(exam?.date) <= 7)?.length}
          </div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-foreground">8.7</div>
          <div className="text-xs text-muted-foreground">Avg Grade</div>
        </div>
      </div>
      {/* Upcoming Exams */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={16} className="mr-2 text-primary" />
          Upcoming Exams
        </h4>
        <div className="space-y-4">
          {examData?.upcomingExams?.map((exam) => {
            const daysUntil = getDaysUntilExam(exam?.date);
            
            return (
              <div key={exam?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-medium text-foreground">{exam?.subject}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getExamTypeColor(exam?.type)}`}>
                        {exam?.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(daysUntil)}`}>
                        {daysUntil === 0 ? 'Today' : 
                         daysUntil === 1 ? 'Tomorrow' : 
                         `${daysUntil} days`}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{exam?.code} • {exam?.syllabus}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{exam?.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{exam?.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{exam?.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" iconName="FileText">
                      Syllabus
                    </Button>
                    <Button variant="default" size="sm" iconName="Bell">
                      Remind
                    </Button>
                  </div>
                </div>
                {daysUntil <= 3 && (
                  <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm text-foreground font-medium">
                        Exam approaching! Duration: {exam?.duration}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent Results */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2 text-primary" />
          Recent Results
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examData?.completedExams?.map((exam, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-foreground">{exam?.subject}</h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  exam?.grade === 'A+' ? 'bg-success/10 text-success' :
                  exam?.grade === 'A'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {exam?.grade}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{exam?.date}</span>
                <span className="text-foreground font-medium">{exam?.marks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamScheduleCard;
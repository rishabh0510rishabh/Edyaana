import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExamDetailsModal = ({ isOpen, onClose, exam, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    subject: exam?.subject || '',
    examType: exam?.examType || 'midterm',
    date: exam?.date || '',
    time: exam?.time || '',
    duration: exam?.duration || '',
    venue: exam?.venue || '',
    semester: exam?.semester || '',
    totalMarks: exam?.totalMarks || '',
    passingMarks: exam?.passingMarks || '',
    instructions: exam?.instructions || '',
    supervisor: exam?.supervisor || '',
    status: exam?.status || 'scheduled'
  });

  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen) return null;

  const examTypeOptions = [
    { value: 'midterm', label: 'Midterm Exam' },
    { value: 'final', label: 'Final Exam' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'practical', label: 'Practical Exam' },
    { value: 'viva', label: 'Viva Voce' },
    { value: 'assignment', label: 'Assignment' }
  ];

  const semesterOptions = [
    { value: 'semester-1', label: 'Semester 1' },
    { value: 'semester-2', label: 'Semester 2' },
    { value: 'semester-3', label: 'Semester 3' },
    { value: 'semester-4', label: 'Semester 4' },
    { value: 'semester-5', label: 'Semester 5' },
    { value: 'semester-6', label: 'Semester 6' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'postponed', label: 'Postponed' }
  ];

  const venueOptions = [
    { value: 'hall-a', label: 'Examination Hall A' },
    { value: 'hall-b', label: 'Examination Hall B' },
    { value: 'hall-c', label: 'Examination Hall C' },
    { value: 'lab-1', label: 'Computer Lab 1' },
    { value: 'lab-2', label: 'Physics Lab' },
    { value: 'lab-3', label: 'Chemistry Lab' },
    { value: 'auditorium', label: 'Main Auditorium' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const tabs = [
    { id: 'details', label: 'Exam Details', icon: 'FileText' },
    { id: 'students', label: 'Enrolled Students', icon: 'Users' },
    { id: 'results', label: 'Results', icon: 'BarChart3' }
  ];

  const mockStudents = [
    { id: 1, name: 'John Smith', rollNo: 'CS001', status: 'enrolled' },
    { id: 2, name: 'Emma Johnson', rollNo: 'CS002', status: 'enrolled' },
    { id: 3, name: 'Michael Brown', rollNo: 'CS003', status: 'absent' },
    { id: 4, name: 'Sarah Davis', rollNo: 'CS004', status: 'enrolled' },
    { id: 5, name: 'David Wilson', rollNo: 'CS005', status: 'enrolled' }
  ];

  const mockResults = [
    { id: 1, name: 'John Smith', rollNo: 'CS001', marks: 85, grade: 'A', status: 'pass' },
    { id: 2, name: 'Emma Johnson', rollNo: 'CS002', marks: 92, grade: 'A+', status: 'pass' },
    { id: 3, name: 'Michael Brown', rollNo: 'CS003', marks: 0, grade: 'F', status: 'absent' },
    { id: 4, name: 'Sarah Davis', rollNo: 'CS004', marks: 78, grade: 'B+', status: 'pass' },
    { id: 5, name: 'David Wilson', rollNo: 'CS005', marks: 88, grade: 'A', status: 'pass' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Schedule New Exam' : 
                 mode === 'edit' ? 'Edit Exam Details' : 'Exam Details'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'view' ? 'View exam information and results' : 'Configure exam settings'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 px-6 border-b border-border">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Subject"
                value={formData?.subject}
                onChange={(e) => handleInputChange('subject', e?.target?.value)}
                disabled={mode === 'view'}
                required
              />

              <Select
                label="Exam Type"
                options={examTypeOptions}
                value={formData?.examType}
                onChange={(value) => handleInputChange('examType', value)}
                disabled={mode === 'view'}
              />

              <Input
                label="Date"
                type="date"
                value={formData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                disabled={mode === 'view'}
                required
              />

              <Input
                label="Time"
                type="time"
                value={formData?.time}
                onChange={(e) => handleInputChange('time', e?.target?.value)}
                disabled={mode === 'view'}
                required
              />

              <Input
                label="Duration (minutes)"
                type="number"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', e?.target?.value)}
                disabled={mode === 'view'}
                placeholder="120"
              />

              <Select
                label="Venue"
                options={venueOptions}
                value={formData?.venue}
                onChange={(value) => handleInputChange('venue', value)}
                disabled={mode === 'view'}
                searchable
              />

              <Select
                label="Semester"
                options={semesterOptions}
                value={formData?.semester}
                onChange={(value) => handleInputChange('semester', value)}
                disabled={mode === 'view'}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                disabled={mode === 'view'}
              />

              <Input
                label="Total Marks"
                type="number"
                value={formData?.totalMarks}
                onChange={(e) => handleInputChange('totalMarks', e?.target?.value)}
                disabled={mode === 'view'}
                placeholder="100"
              />

              <Input
                label="Passing Marks"
                type="number"
                value={formData?.passingMarks}
                onChange={(e) => handleInputChange('passingMarks', e?.target?.value)}
                disabled={mode === 'view'}
                placeholder="40"
              />

              <Input
                label="Supervisor"
                value={formData?.supervisor}
                onChange={(e) => handleInputChange('supervisor', e?.target?.value)}
                disabled={mode === 'view'}
                placeholder="Dr. John Doe"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Instructions
                </label>
                <textarea
                  value={formData?.instructions}
                  onChange={(e) => handleInputChange('instructions', e?.target?.value)}
                  disabled={mode === 'view'}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  placeholder="Enter exam instructions..."
                />
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Enrolled Students</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Download">
                    Export List
                  </Button>
                  <Button variant="outline" size="sm" iconName="UserPlus">
                    Add Student
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Roll No</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Student Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents?.map((student) => (
                      <tr key={student?.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-foreground">{student?.rollNo}</td>
                        <td className="py-3 px-4 text-foreground">{student?.name}</td>
                        <td className="py-3 px-4">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${student?.status === 'enrolled' ? 'bg-success/10 text-success' :
                              student?.status === 'absent'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                            }
                          `}>
                            {student?.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Exam Results</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Upload">
                    Import Results
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export Results
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Roll No</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Student Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Marks</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Grade</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults?.map((result) => (
                      <tr key={result?.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-foreground">{result?.rollNo}</td>
                        <td className="py-3 px-4 text-foreground">{result?.name}</td>
                        <td className="py-3 px-4 text-foreground">{result?.marks}/100</td>
                        <td className="py-3 px-4">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${result?.grade === 'A+' || result?.grade === 'A' ? 'bg-success/10 text-success' :
                              result?.grade === 'B+'|| result?.grade === 'B' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                            }
                          `}>
                            {result?.grade}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${result?.status === 'pass' ? 'bg-success/10 text-success' :
                              result?.status === 'fail'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                            }
                          `}>
                            {result?.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode !== 'view' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              {mode === 'create' ? 'Schedule Exam' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetailsModal;
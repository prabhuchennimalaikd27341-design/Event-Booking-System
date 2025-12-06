import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { MapPin, DollarSign, Calendar, Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const foundJob = jobs.find(j => j.id === id);
    setJob(foundJob);

    if (user && foundJob) {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const applied = applications.some(app => app.jobId === id && app.applicantId === user.id);
      setHasApplied(applied);
    }
  }, [id, user]);

  const handleApply = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to apply for jobs',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    if (user.userType !== 'jobseeker') {
      toast({
        title: 'Not Allowed',
        description: 'Only job seekers can apply for jobs',
        variant: 'destructive'
      });
      return;
    }

    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApplication = {
      id: Date.now().toString(),
      jobId: id,
      jobTitle: job.title,
      company: job.company,
      applicantId: user.id,
      applicantName: user.name,
      applicantEmail: user.email,
      status: 'pending',
      appliedDate: new Date().toISOString()
    };

    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    setHasApplied(true);

    toast({
      title: 'Success',
      description: 'Application submitted successfully!'
    });
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/jobs')}
              className="text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">{job.title}</h1>
                <p className="text-xl text-slate-700 font-medium mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-slate-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-teal-600" />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0 text-base px-4 py-2">
                {job.type}
              </Badge>
            </div>
            
            {hasApplied ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">You have already applied to this job</span>
              </div>
            ) : (
              <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Apply Now
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Job Description</h2>
              <p className="text-slate-700 leading-relaxed text-lg">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {job.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 leading-relaxed">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetail;
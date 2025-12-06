import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Briefcase, LogOut, Building, Plus, Edit, Trash2, Users, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isEditJobOpen, setIsEditJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    companyName: user?.companyName || '',
    companyDescription: user?.companyDescription || '',
    website: user?.website || '',
    location: user?.location || ''
  });
  const [jobForm, setJobForm] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salaryRange: '',
    description: '',
    qualifications: '',
    responsibilities: ''
  });

  useEffect(() => {
    if (!user || user.userType !== 'employer') {
      navigate('/login');
      return;
    }

    loadJobs();
    loadApplications();
  }, [user, navigate]);

  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const myJobs = allJobs.filter(job => job.employerId === user.id);
    setJobs(myJobs);
  };

  const loadApplications = () => {
    const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const myJobIds = allJobs.filter(job => job.employerId === user.id).map(job => job.id);
    const myApplications = allApplications.filter(app => myJobIds.includes(app.jobId));
    setApplications(myApplications);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const result = updateProfile(profileData);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Profile updated successfully!'
      });
    }
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const newJob = {
      id: Date.now().toString(),
      ...jobForm,
      company: profileData.companyName || user.name,
      employerId: user.id,
      qualifications: jobForm.qualifications.split('\n').filter(q => q.trim()),
      responsibilities: jobForm.responsibilities.split('\n').filter(r => r.trim()),
      postedDate: new Date().toISOString(),
      status: 'active'
    };

    allJobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(allJobs));
    loadJobs();
    setIsAddJobOpen(false);
    setJobForm({
      title: '',
      location: '',
      type: 'Full-time',
      salaryRange: '',
      description: '',
      qualifications: '',
      responsibilities: ''
    });

    toast({
      title: 'Success',
      description: 'Job posted successfully!'
    });
  };

  const handleEditJob = (e) => {
    e.preventDefault();
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = allJobs.findIndex(j => j.id === editingJob.id);
    
    if (jobIndex !== -1) {
      allJobs[jobIndex] = {
        ...editingJob,
        ...jobForm,
        qualifications: jobForm.qualifications.split('\n').filter(q => q.trim()),
        responsibilities: jobForm.responsibilities.split('\n').filter(r => r.trim())
      };
      localStorage.setItem('jobs', JSON.stringify(allJobs));
      loadJobs();
      setIsEditJobOpen(false);
      setEditingJob(null);
      
      toast({
        title: 'Success',
        description: 'Job updated successfully!'
      });
    }
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const filteredJobs = allJobs.filter(j => j.id !== jobId);
      localStorage.setItem('jobs', JSON.stringify(filteredJobs));
      loadJobs();
      
      toast({
        title: 'Success',
        description: 'Job deleted successfully!'
      });
    }
  };

  const openEditDialog = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salaryRange: job.salaryRange,
      description: job.description,
      qualifications: Array.isArray(job.qualifications) ? job.qualifications.join('\n') : '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : ''
    });
    setIsEditJobOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Employer Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage your job listings and review applications</p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl bg-white shadow-lg border-0">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300">
              <Briefcase className="mr-2 h-4 w-4" />
              My Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300">
              <Users className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300">
              <Building className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Job Listings</h2>
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post a New Job</DialogTitle>
                    <DialogDescription>Fill in the details to create a new job listing</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddJob} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={jobForm.title}
                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select value={jobForm.type} onValueChange={(value) => setJobForm({ ...jobForm, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryRange">Salary Range</Label>
                      <Input
                        id="salaryRange"
                        value={jobForm.salaryRange}
                        onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                        placeholder="$80,000 - $120,000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={jobForm.description}
                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications (one per line)</Label>
                      <Textarea
                        id="qualifications"
                        value={jobForm.qualifications}
                        onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                      <Textarea
                        id="responsibilities"
                        value={jobForm.responsibilities}
                        onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white">
                      Post Job
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {jobs.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">You haven't posted any jobs yet</p>
                  <Button
                    onClick={() => setIsAddJobOpen(true)}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white"
                  >
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-3">
                            <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0">
                              {job.type}
                            </Badge>
                            <span>{job.location}</span>
                            <span>{job.salaryRange}</span>
                          </div>
                          <p className="text-slate-600 line-clamp-2">{job.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="hover:bg-teal-50 hover:border-teal-600 hover:text-teal-600 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(job)}
                            className="hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Edit Job Dialog */}
            <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Job</DialogTitle>
                  <DialogDescription>Update the job listing details</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditJob} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Job Title</Label>
                    <Input
                      id="edit-title"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-location">Location</Label>
                      <Input
                        id="edit-location"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">Job Type</Label>
                      <Select value={jobForm.type} onValueChange={(value) => setJobForm({ ...jobForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-salaryRange">Salary Range</Label>
                    <Input
                      id="edit-salaryRange"
                      value={jobForm.salaryRange}
                      onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-qualifications">Qualifications (one per line)</Label>
                    <Textarea
                      id="edit-qualifications"
                      value={jobForm.qualifications}
                      onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-responsibilities">Responsibilities (one per line)</Label>
                    <Textarea
                      id="edit-responsibilities"
                      value={jobForm.responsibilities}
                      onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white">
                    Update Job
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Applications Received</CardTitle>
                <CardDescription>Review applications from job seekers</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No applications received yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <Card key={app.id} className="border border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-900 mb-1">{app.applicantName}</h3>
                              <p className="text-slate-600 mb-2">{app.applicantEmail}</p>
                              <p className="text-sm text-slate-700 font-medium mb-1">Applied for: {app.jobTitle}</p>
                              <p className="text-sm text-slate-500">
                                Applied on {new Date(app.appliedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              className={
                                app.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  : app.status === 'accepted'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Update your company information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Contact Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">Company Description</Label>
                    <Textarea
                      id="companyDescription"
                      value={profileData.companyDescription}
                      onChange={(e) => setProfileData({ ...profileData, companyDescription: e.target.value })}
                      placeholder="Tell us about your company..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="https://company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
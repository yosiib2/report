import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Users, AlertTriangle, Calendar, Loader2, Trash2, Lock, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Report {
  _id: string;
  name: string;
  email: string;
  phone: string;
  abuseType: string;
  description: string;
  createdAt: string;
}

// ✅ Use environment variable for backend URL
const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const [isDirectorLoggedIn, setIsDirectorLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changeLoading, setChangeLoading] = useState(false);

  // --- Fetch reports on mount ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchReports(token);
    else setIsLoading(false);
  }, []);

  const fetchReports = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${apiUrl}/api/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        const sortedReports = result.sort(
          (a: Report, b: Report) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReports(sortedReports);
      } else {
        if (response.status === 401 || response.status === 403) {
          toast({
            title: 'Unauthorized',
            description: 'Session expired or invalid token. Please log in again.',
            variant: 'destructive',
          });
          handleLogout();
        } else {
          throw new Error(result.message || 'Failed to fetch reports');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load reports';
      setError(errorMessage);
      toast({
        title: 'Error Loading Reports',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this report?');
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in again',
        variant: 'destructive',
      });
      setIsDirectorLoggedIn(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/reports/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setReports((prev) => prev.filter((report) => report._id !== id));
        toast({
          title: 'Report Deleted',
          description: result.message || 'The report has been deleted.',
          variant: 'default',
        });
      } else {
        throw new Error(result.message || 'Failed to delete report');
      }
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter both username and password',
        variant: 'destructive',
      });
      return;
    }

    setLoginLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsDirectorLoggedIn(true);
        toast({ title: 'Login Successful', description: 'Fetching reports...', variant: 'default' });
        fetchReports(data.token);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      toast({ title: 'Login Failed', description: error instanceof Error ? error.message : 'Something went wrong', variant: 'destructive' });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter both old and new password',
        variant: 'destructive',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: 'Authentication Required', description: 'Please log in again', variant: 'destructive' });
      setIsDirectorLoggedIn(false);
      return;
    }

    setChangeLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({ title: 'Success', description: data.message || 'Password changed successfully', variant: 'default' });
        setOldPassword('');
        setNewPassword('');
      } else {
        throw new Error(data.message || 'Password change failed');
      }
    } catch (error) {
      toast({ title: 'Failed', description: error instanceof Error ? error.message : 'Something went wrong', variant: 'destructive' });
    } finally {
      setChangeLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDirectorLoggedIn(false);
    setReports([]);
    toast({ title: 'Logged Out', description: 'You have been signed out', variant: 'default' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getAbuseTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Physical: 'bg-destructive text-destructive-foreground',
      Emotional: 'bg-accent text-accent-foreground',
      Sexual: 'bg-destructive text-destructive-foreground',
      Financial: 'bg-primary text-primary-foreground',
      Other: 'bg-secondary text-secondary-foreground',
    };
    return colors[type] || 'bg-secondary text-secondary-foreground';
  };

  const stats = {
    total: reports.length,
    thisMonth: reports.filter((r) => {
      const d = new Date(r.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    byType: reports.reduce((acc, r) => {
      acc[r.abuseType || 'Other'] = (acc[r.abuseType || 'Other'] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }),
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /><p>Loading Dashboard...</p></div>;
  if (error) return (
    <div className="min-h-screen p-4">
      <Card className="shadow-card border-destructive max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => { const t = localStorage.getItem('token'); if(t) fetchReports(t); }}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
          <h1 className="text-3xl font-bold">Director Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage abuse reports</p>
        </div>

        {!isDirectorLoggedIn ? (
          <Card className="max-w-md mx-auto mb-6 p-4 shadow-card">
            <CardHeader className="flex items-center space-x-2 mb-4">
              <Lock className="h-6 w-6" /> <CardTitle>Director Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-3">
                <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/> Logging in...</> : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4"/> <span>Logout</span>
              </Button>
            </div>

            <Card className="max-w-md mx-auto mb-6 p-4 shadow-card">
              <CardHeader className="flex items-center space-x-2 mb-4">
                <Lock className="h-6 w-6" /> 
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-3">
                  <Input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                  <Input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <Button type="submit" className="w-full" disabled={changeLoading}>
                    {changeLoading ? 'Updating...' : 'Change Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}

        {isDirectorLoggedIn && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All time reports received</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{stats.thisMonth}</div>
                  <p className="text-xs text-muted-foreground">Reports received this month</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">Most Common</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {Object.keys(stats.byType).length > 0 ? Object.entries(stats.byType).sort(([,a],[,b])=>b-a)[0][0] : 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">Most frequently reported type</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reports.map(report => (
                <Card key={report._id} className="shadow-card">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>{report.name} ({report.abuseType || 'Other'})</CardTitle>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getAbuseTypeColor(report.abuseType)}`}>
                      {report.abuseType || 'Other'}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Email:</strong> {report.email}</p>
                    <p><strong>Phone:</strong> {report.phone}</p>
                    <p><strong>Description:</strong> {report.description}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {formatDate(report.createdAt)}</p>
                    <Button variant="destructive" size="sm" className="mt-2 flex items-center space-x-2" onClick={() => deleteReport(report._id)}>
                      <Trash2 className="h-4 w-4"/> Delete Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
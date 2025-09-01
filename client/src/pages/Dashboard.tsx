import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Trash2, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface Report {
  _id: string;
  name: string;
  email: string;
  phone: string;
  abuseType: string;
  description: string;
  sex: string;
  workPosition: string;
  educationLevel: string;
  jobType: string;
  incidentTime: string;
  incidentPlace: string;
  incidentDay: string;
  image?: string;
  createdAt: string;
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDirectorLoggedIn, setIsDirectorLoggedIn] = useState<boolean>(() => !!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(100);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // -------------------------------
  // INIT SETTINGS + FETCH REPORTS
  // -------------------------------
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedBrightness = Number(localStorage.getItem('brightness')) || 100;
    setDarkMode(savedDarkMode);
    setBrightness(savedBrightness);
    document.documentElement.style.filter = `brightness(${savedBrightness}%)`;
    document.documentElement.classList.toggle('dark', savedDarkMode);

    const token = localStorage.getItem('token');
    if (token) fetchReports(token);
    else setIsLoading(false);
  }, []);

  // -------------------------------
  // FILTER REPORTS
  // -------------------------------
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReports(reports);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredReports(
      reports.filter(r =>
        r.name.toLowerCase().includes(term) || r.phone.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, reports]);

  // -------------------------------
  // FETCH REPORTS (always with token)
  // -------------------------------
  const fetchReports = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/api/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error(data?.message || 'Failed to fetch reports');

      const finalReports: Report[] = Array.isArray(data) ? data : data?.data || [];
      finalReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReports(finalReports);
      setFilteredReports(finalReports);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load reports';
      setError(message);
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  // -------------------------------
  // LOGIN
  // -------------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      return toast({ title: 'Error', description: 'Please enter username and password', variant: 'destructive' });
    }
    setLoginLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      localStorage.setItem('token', data.token);
      setIsDirectorLoggedIn(true);
      toast({ title: 'Success', description: 'Logged in successfully', variant: 'default' });
      await fetchReports(data.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoginLoading(false);
    }
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDirectorLoggedIn(false);
    setReports([]);
    setFilteredReports([]);
    navigate('/');
  };

  // -------------------------------
  // DELETE REPORT
  // -------------------------------
  const deleteReport = async (id: string) => {
    if (!window.confirm('Delete this report?')) return;
    const token = localStorage.getItem('token');
    if (!token) return handleLogout();

    try {
      const res = await fetch(`${apiUrl}/api/reports/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.status === 401) return handleLogout();
      if (!res.ok) throw new Error(data?.message || 'Failed to delete report');

      setReports(prev => prev.filter(r => r._id !== id));
      setFilteredReports(prev => prev.filter(r => r._id !== id));
      toast({ title: 'Deleted', description: 'Report deleted successfully', variant: 'default' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete report';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    }
  };

  // -------------------------------
  // DARK MODE + BRIGHTNESS
  // -------------------------------
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
    document.documentElement.classList.toggle('dark', newValue);
  };

  const handleBrightnessChange = (value: number[]) => {
    const brightnessValue = value[0];
    setBrightness(brightnessValue);
    localStorage.setItem('brightness', String(brightnessValue));
    document.documentElement.style.filter = `brightness(${brightnessValue}%)`;
  };

  // -------------------------------
  // CHANGE PASSWORD
  // -------------------------------
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      return toast({ title: 'Error', description: 'Please fill both fields', variant: 'destructive' });
    }

    const token = localStorage.getItem('token');
    if (!token) return handleLogout();

    setChangingPassword(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/change-password`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (res.status === 401) return handleLogout();
      if (!res.ok) throw new Error(data?.message || 'Failed to change password');

      toast({ title: 'Success', description: data.message || 'Password changed successfully', variant: 'default' });
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to change password';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setChangingPassword(false);
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">{t('dashboard') || 'Dashboard'}</h1>
        {isDirectorLoggedIn && (
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="outline"
              size="icon"
              className="touch-manipulation"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="icon"
              className="touch-manipulation"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* LOGIN FORM */}
      {!isDirectorLoggedIn && (
        <div className="w-full max-w-md space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleLogin} className="w-full">
            {loginLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      )}

      {/* SEARCH + REPORTS */}
      {isDirectorLoggedIn && (
        <>
          <Input
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full"
          />
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredReports.length === 0 ? (
            <p className="text-sm text-gray-500">No reports found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map(report => (
                <Card key={report._id} className="touch-manipulation">
                  <CardHeader>
                    <CardTitle className="truncate">{report.name}</CardTitle>
                    <CardDescription className="truncate">{report.abuseType}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p><strong>Description:</strong> {report.description}</p>
                    <p><strong>Email:</strong> {report.email}</p>
                    <p><strong>Phone:</strong> {report.phone}</p>
                    <p><strong>Sex:</strong> {report.sex}</p>
                    <p><strong>Work Position:</strong> {report.workPosition}</p>
                    <p><strong>Education Level:</strong> {report.educationLevel}</p>
                    <p><strong>Job Type:</strong> {report.jobType}</p>
                    <p><strong>Incident Time:</strong> {report.incidentTime}</p>
                    <p><strong>Incident Place:</strong> {report.incidentPlace}</p>
                    <p><strong>Incident Day:</strong> {report.incidentDay}</p>

                    {report.image && (
                      <div className="mt-2">
                        <img
                          src={`${apiUrl}/${report.image.replace(/\\/g, '/')}`}
                          alt="Report"
                          className="w-full h-auto rounded object-cover"
                        />
                      </div>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3 w-full sm:w-auto"
                      onClick={() => deleteReport(report._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* SETTINGS */}
      {showSettings && (
        <div className="p-4 border rounded-lg space-y-4 w-full max-w-md">
          <div className="flex justify-between items-center">
            <span>Dark mode</span>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
          <div>
            <span>Brightness</span>
            <Slider value={[brightness]} onValueChange={handleBrightnessChange} max={200} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleChangePassword} disabled={changingPassword} className="w-full">
              {changingPassword ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
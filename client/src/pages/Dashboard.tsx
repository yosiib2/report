import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Users, AlertTriangle, Calendar, Loader2, Trash2, Lock, LogOut, Settings, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface Report {
  _id: string;
  name: string;
  email: string;
  phone: string;
  abuseType: string;
  description: string;
  createdAt: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { t } = useTranslation();
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

  // Eye icon toggle states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Settings panel states
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchReports(token);
    else setIsLoading(false);

    // Load dark mode and brightness from local storage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedBrightness = Number(localStorage.getItem('brightness')) || 100;
    setDarkMode(savedDarkMode);
    setBrightness(savedBrightness);
    document.documentElement.style.filter = `brightness(${savedBrightness}%)`;
    document.documentElement.classList.toggle('dark', savedDarkMode);
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
            title: t('unauthorized'),
            description: t('sessionExpired'),
            variant: 'destructive',
          });
          handleLogout();
        } else {
          throw new Error(result.message || t('fetchFailed'));
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('failedLoadReports');
      setError(errorMessage);
      toast({
        title: t('errorLoadingDashboard'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    const confirmed = window.confirm(t('confirmDelete'));
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: t('authRequired'),
        description: t('loginAgain'),
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
          title: t('reportDeleted'),
          description: result.message || t('reportDeletedDesc'),
          variant: 'default',
        });
      } else {
        throw new Error(result.message || t('deleteFailed'));
      }
    } catch (error) {
      toast({
        title: t('failed'),
        description: error instanceof Error ? error.message : t('somethingWrong'),
        variant: 'destructive',
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: t('missingFields'),
        description: t('enterBothFields'),
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
        toast({ title: t('loginSuccessful'), description: t('fetchingReports'), variant: 'default' });
        fetchReports(data.token);
      } else {
        throw new Error(data.message || t('loginFailed'));
      }
    } catch (error) {
      toast({
        title: t('loginFailed'),
        description: error instanceof Error ? error.message : t('somethingWrong'),
        variant: 'destructive',
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast({
        title: t('missingFields'),
        description: t('enterBothPasswords'),
        variant: 'destructive',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: t('authRequired'), description: t('loginAgain'), variant: 'destructive' });
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
        toast({ title: t('success'), description: data.message || t('passwordChanged'), variant: 'default' });
        setOldPassword('');
        setNewPassword('');
      } else {
        throw new Error(data.message || t('passwordChangeFailed'));
      }
    } catch (error) {
      toast({ title: t('failed'), description: error instanceof Error ? error.message : t('somethingWrong'), variant: 'destructive' });
    } finally {
      setChangeLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDirectorLoggedIn(false);
    setReports([]);
    toast({ title: t('loggedOut'), description: t('signedOut'), variant: 'default' });
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

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  // Brightness control
  const handleBrightnessSlider = (value: number) => {
    setBrightness(value);
    document.documentElement.style.filter = `brightness(${value}%)`;
    localStorage.setItem('brightness', String(value));
  };

  const stats = {
    total: reports.length,
    thisMonth: reports.filter((r) => {
      const d = new Date(r.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    byType: reports.reduce((acc, r) => {
      acc[r.abuseType || t('other')] = (acc[r.abuseType || t('other')] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }),
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center space-x-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span>{t('loadingDashboard')}</span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen p-4">
        <Card className="shadow-card border-destructive max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <CardTitle className="text-destructive">{t('errorLoadingDashboard')}</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => { const t = localStorage.getItem('token'); if(t) fetchReports(t); }}>
              {t('tryAgain')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="destructive" className="flex items-center space-x-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> {t('logout')}
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" /> {t('settings')}
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="absolute right-0 top-12 w-80 p-4 shadow-lg bg-white dark:bg-gray-800 z-50 space-y-4">
            <CardHeader><CardTitle>{t('settings')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* Change Password */}
              <div>
                <p className="font-semibold">{t('changePassword')}</p>
                <form onSubmit={handleChangePassword} className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showOldPassword ? 'text' : 'password'}
                      placeholder={t('oldPassword')}
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      className="px-2 py-1 text-sm pr-10"
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </span>
                  </div>

                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder={t('newPassword')}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="px-2 py-1 text-sm pr-10"
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </span>
                  </div>

                  <Button type="submit" className="w-full" disabled={changeLoading}>
                    {changeLoading ? t('updating') : t('changePassword')}
                  </Button>
                </form>
              </div>

              {/* Night Mode */}
              <div className="flex justify-between items-center">
                <span>{t('nightMode')}</span>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>

              {/* Brightness */}
              <div>
                <span>{t('brightness')}</span>
                <Slider
                  min={50}
                  max={150}
                  value={[brightness]}
                  onValueChange={(values: number[]) => handleBrightnessSlider(values[0])}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Stats & Reports */}
        {isDirectorLoggedIn && (
          <>
            <div className="text-center mb-6">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
              <h1 className="text-3xl font-bold">{t('directorDashboard')}</h1>
              <p className="text-muted-foreground">{t('monitorReports')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">{t('totalReports')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">{t('allTimeReports')}</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">{t('thisMonth')}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{stats.thisMonth}</div>
                  <p className="text-xs text-muted-foreground">{t('reportsThisMonth')}</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">{t('mostCommon')}</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {Object.keys(stats.byType).length > 0 ? Object.entries(stats.byType).sort(([,a],[,b])=>b-a)[0][0] : t('other')}
                  </div>
                  <p className="text-xs text-muted-foreground">{t('mostCommonType')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Reports */}
            <div className="grid grid-cols-1 gap-4">
              {reports.map(report => (
                <Card key={report._id} className="shadow-card">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>{report.name} ({report.abuseType || t('other')})</CardTitle>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getAbuseTypeColor(report.abuseType)}`}>
                      {report.abuseType || t('other')}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p><strong>{t('email')}:</strong> {report.email}</p>
                    <p><strong>{t('phone')}:</strong> {report.phone}</p>
                    <p><strong>{t('description')}:</strong> {report.description}</p>
                    <p className="text-xs text-muted-foreground">{t('submitted')}: {formatDate(report.createdAt)}</p>
                    <Button variant="destructive" className="mt-2 flex items-center space-x-2" onClick={() => deleteReport(report._id)}>
                      <Trash2 className="h-4 w-4"/> {t('deleteReport')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Login Form */}
        {!isDirectorLoggedIn && (
          <Card className="max-w-md mx-auto mb-6 p-4 shadow-card">
            <CardHeader className="flex items-center space-x-2 mb-4">
              <Lock className="h-6 w-6" /> <CardTitle>{t('directorLogin')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-3">
                <Input placeholder={t('username')} value={username} onChange={e => setUsername(e.target.value)} className="px-2 py-1 text-sm" />

                <div className="relative">
                  <Input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="px-2 py-1 text-sm pr-10"
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </span>
                </div>

                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/> {t('loggingIn')}</> : t('login')}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

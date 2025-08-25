import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Heart, Phone } from 'lucide-react';

// ✅ Backend URL from env
const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  // Example: If you want to fetch some backend data in the future
  const fetchSomething = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/some-endpoint`);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            {/* ✅ Ministry Logo from /public */}
            <img
              src="/minstriy_logo.png"
              alt="Ministry Logo"
              className="h-29 w-29 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">SafeSpace</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            A safe, confidential platform for reporting abuse and seeking help
          </p>
          <p className="text-lg mb-10 opacity-80">
            Your voice matters. Your safety is our priority. Report incidents confidentially
            and connect with resources that can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">
                Report Incident
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform"
            >
              Get Help Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">Why Choose SafeSpace?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're committed to providing a secure environment for reporting and support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Lock className="h-14 w-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">100% Confidential</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  Your identity and information are completely protected. All reports are encrypted and securely stored.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="h-14 w-14 text-pink-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Compassionate Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  Our trained professionals provide empathetic support and connect you with appropriate resources.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Phone className="h-14 w-14 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">24/7 Available</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  Help is available whenever you need it. Submit reports anytime, anywhere, from any device.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🚨 In Immediate Danger?</h2>
          <p className="text-lg mb-6 opacity-90">
            If you are in immediate physical danger, please contact emergency services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
              Call 911
            </Button>
            <Button className="px-8 py-3 rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform">
              National Hotline: 1-800-799-SAFE
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Take the First Step?</h2>
          <p className="text-lg mb-10 opacity-90">
            You don't have to face this alone. Start your report today in a safe, secure environment.
          </p>
          <Link to="/report">
            <Button className="px-10 py-4 text-lg font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-transform">
              Start Your Report
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Heart, Phone } from 'lucide-react';

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
      <section className="bg-gradient-hero text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SafeSpace</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            A safe, confidential platform for reporting abuse and seeking help
          </p>
          <p className="text-lg mb-8 opacity-80">
            Your voice matters. Your safety is our priority. Report incidents confidentially 
            and connect with resources that can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Report Incident
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
              Get Help Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SafeSpace?</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing a secure environment for reporting and support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="text-center">
                <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>100% Confidential</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Your identity and information are completely protected. 
                  All reports are encrypted and securely stored.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Compassionate Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Our trained professionals provide empathetic support 
                  and connect you with appropriate resources.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>24/7 Available</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Help is available whenever you need it. 
                  Submit reports anytime, anywhere, from any device.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-destructive text-destructive-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">In Immediate Danger?</h2>
          <p className="text-lg mb-6">
            If you are in immediate physical danger, please contact emergency services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">Call 911</Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              National Hotline: 1-800-799-SAFE
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Take the First Step?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            You don't have to face this alone. Start your report today in a safe, secure environment.
          </p>
          <Link to="/report">
            <Button variant="hero" size="lg">Start Your Report</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

// ReportForm.tsx (unchanged logic, tightened classes; relies on the new CSS utilities)
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Shield, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    abuseType: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.abuseType || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Report Submitted Successfully",
          description: "Your report has been received. Someone will contact you soon.",
          variant: "default",
        });
      } else {
        throw new Error(result.message || "Failed to submit report");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <CardTitle className="text-2xl text-success">Report Submitted Successfully</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your courage in speaking up. Your report has been received securely.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                A trained professional will review your report and may contact you using the information provided.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold text-foreground">What happens next?</p>
                <ul className="text-left text-muted-foreground mt-2 space-y-1">
                  <li>• Your report will be reviewed within 24 hours</li>
                  <li>• You may be contacted for additional information</li>
                  <li>• Appropriate resources and support will be provided</li>
                </ul>
              </div>
              <Button
                variant="hero"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", abuseType: "", description: "" });
                }}
              >
                Submit Another Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Confidential Report Form</h1>
          <p className="text-muted-foreground">Your information is completely secure and confidential</p>
        </div>

        <Card className="shadow-card border border-border bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Report an Incident</span>
            </CardTitle>
            <CardDescription>
              Please provide as much detail as you feel comfortable sharing. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="bg-background"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abuseType">Type of Abuse *</Label>
                  <Select
                    value={formData.abuseType}
                    onValueChange={(value) => handleInputChange("abuseType", value)}
                    required
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select abuse type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border shadow-lg">
                      <SelectItem value="Physical">Physical</SelectItem>
                      <SelectItem value="Emotional">Emotional</SelectItem>
                      <SelectItem value="Sexual">Sexual</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Please describe what happened. Include as much detail as you feel comfortable sharing..."
                  className="bg-background min-h-32"
                  required
                />
              </div>

              <div className="bg-muted p-4 rounded-lg gradient-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Privacy Notice:</strong> Your information is encrypted and stored securely.
                  Only authorized personnel will have access to your report.
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting Report...
                  </>
                ) : (
                  "Submit Confidential Report"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
            <p className="font-semibold mb-2">In Immediate Danger?</p>
            <p className="text-sm">
              If you are in immediate physical danger, please call 911 or your local emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportForm = () => {
  const { t } = useTranslation();

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
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.abuseType ||
      !formData.description
    ) {
      toast({
        title: t("missingInfoTitle"),
        description: t("missingInfoDesc"),
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
          title: t("reportSuccessTitle"),
          description: t("reportSuccessDesc"),
          variant: "default",
        });
      } else throw new Error(result.message || t("reportFailDesc"));
    } catch (error) {
      toast({
        title: t("reportFailTitle"),
        description:
          error instanceof Error ? error.message : t("reportFailDesc"),
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
              <CardTitle className="text-2xl text-success">
                {t("reportSuccessTitle")}
              </CardTitle>
              <CardDescription className="text-lg">
                {t("reportSuccessDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">{t("reportNextSteps")}</p>
              <Button
                className="bg-[#0D4D4D] hover:bg-[#0b3c3c] text-white"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    abuseType: "",
                    description: "",
                  });
                }}
              >
                {t("submitAnother")}
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
        {/* 🔹 Header with Logo */}
        <div className="text-center mb-8">
          <img
            src="/minstriy_logo.png"
            alt="Ministry Logo"
            className="h-16 w-16 mx-auto mb-4 rounded-full object-contain"
          />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("confidentialReportForm")}
          </h1>
          <p className="text-muted-foreground">{t("infoSecure")}</p>
        </div>

        <Card className="shadow-card border border-border bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>{t("reportIncident")}</span>
            </CardTitle>
            <CardDescription>{t("reportIncidentDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                    placeholder={t("namePlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    placeholder={t("emailPlaceholder")}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    placeholder={t("phonePlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abuseType">{t("abuseType")}</Label>
                  <Select
                    value={formData.abuseType}
                    onValueChange={(value) =>
                      handleInputChange("abuseType", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectAbuseType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physical">
                        {t("physical")}
                      </SelectItem>
                      <SelectItem value="Emotional">
                        {t("emotional")}
                      </SelectItem>
                      <SelectItem value="Sexual">{t("sexual")}</SelectItem>
                      <SelectItem value="Financial">
                        {t("financial")}
                      </SelectItem>
                      <SelectItem value="Other">{t("other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("description")}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder={t("descriptionPlaceholder")}
                  required
                />
              </div>

              <div className="bg-muted p-4 rounded-lg gradient-border">
                <p className="text-sm text-muted-foreground">
                  {t("privacyNotice")}
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#0D4D4D] hover:bg-[#0b3c3c] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t("submitting")}
                  </>
                ) : (
                  t("submitReport")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
 
        {/* Immediate Danger Section */}
        <div className="mt-8 text-center">
          <div className="bg-[#0D4D4D] text-white p-4 rounded-lg">
            <p className="font-semibold mb-2">{t("immediateDanger")}</p>
            <p className="text-sm">{t("immediateDangerDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;

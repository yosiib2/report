import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Heart, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Handle Report button click
  const handleReportClick = () => {
    navigate("/report"); // Navigate to report form
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ backgroundColor: "#166866" }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-6 px-3 sm:px-4 bg-transparent">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-3 sm:px-4 animate-fadeIn">
          {/* Left Side: Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
              {t("E-Report")}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg mb-3 opacity-90 leading-relaxed">
              {t("homeDescription")}
            </p>

            <p className="text-xs sm:text-sm lg:text-base mb-5 opacity-80 leading-relaxed">
              {t("homeSubDescription")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
              <Button
                onClick={handleReportClick}
                className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base lg:text-lg font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                {t("Report")}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base lg:text-lg font-semibold rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform"
              >
                {t("Help")}
              </Button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            {/* <img
              src="/phonee.jpg"
              alt="Hero Illustration"
              className="w-64 sm:w-72 lg:w-80 h-auto object-contain"
            /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 px-3 sm:px-4 md:px-6 bg-white rounded-xl shadow-sm mx-2 md:mx-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">
              {t("E-Report")}
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              {t("safeSpaceCommitment")}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 text-center">
            {/* Confidentiality */}
            <Card className="shadow-md border border-gray-100 bg-white text-gray-900 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <Lock className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 text-indigo-600 mx-auto mb-2.5" />
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  {t("confidential")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  {t("confidentialDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Compassionate Support */}
            <Card className="shadow-md border border-gray-100 bg-white text-gray-900 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <Heart className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 text-pink-500 mx-auto mb-2.5" />
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  {t("compassionateSupport")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  {t("compassionateSupportDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            {/* 24/7 Availability */}
            <Card className="shadow-md border border-gray-100 bg-white text-gray-900 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <Phone className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 text-green-500 mx-auto mb-2.5" />
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  {t("available247")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  {t("available247Desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 px-3 sm:px-4 md:px-6 bg-transparent">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-5">
            {t("readyFirstStep")}
          </h2>
          <p className="text-base sm:text-lg mb-5 md:mb-8 opacity-90">
            {t("firstStepDesc")}
          </p>
          <div>
            <Button
              onClick={handleReportClick}
              className="px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              {t("startReport")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

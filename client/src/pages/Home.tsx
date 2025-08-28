import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="relative overflow-hidden py-10 px-4 bg-transparent">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 animate-fadeIn px-4">
          {/* Left Side: Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              {t("E-Report")}
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-4 opacity-90 leading-relaxed">
              {t("homeDescription")}
            </p>

            <p className="text-xs sm:text-sm md:text-base mb-6 opacity-80">
              {t("homeSubDescription")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
              <Button
                onClick={handleReportClick}
                className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base md:text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                {t("Report")}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base md:text-lg font-semibold rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform"
              >
                {t("Help")}
              </Button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img
              src="/phonee.jpg"
              alt="Hero Illustration"
              className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-white rounded-lg mx-2 md:mx-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              {t("E-Report")}
            </h2>
            <p className="text-base md:text-lg opacity-90">
              {t("safeSpaceCommitment")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-center">
            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Lock className="h-12 w-12 md:h-14 md:w-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-xl md:text-2xl">
                  {t("confidential")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm md:text-base">
                  {t("confidentialDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 md:h-14 md:w-14 text-pink-500 mx-auto mb-4" />
                <CardTitle className="text-xl md:text-2xl">
                  {t("compassionateSupport")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm md:text-base">
                  {t("compassionateSupportDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 md:h-14 md:w-14 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl md:text-2xl">
                  {t("available247")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm md:text-base">
                  {t("available247Desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 bg-transparent">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">
            {t("readyFirstStep")}
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-10 opacity-90">
            {t("firstStepDesc")}
          </p>
          <div>
            <Button
              onClick={handleReportClick}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-transform"
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

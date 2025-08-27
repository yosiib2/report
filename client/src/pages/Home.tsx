import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Heart, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#166866" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 bg-transparent">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto text-left animate-fadeIn">
          <div className="flex justify-center mb-6">
            <img
              src="/minstriy_logo.png"
              alt={t("ministryLogo")}
              className="h-29 w-29 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            {t("E-Report")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            {t("homeDescription")}
          </p>
          <p className="text-lg mb-10 opacity-80">{t("homeSubDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">
                {t("Report")}
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform"
            >
              {t("getHelpNow")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white rounded-lg mx-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-left">
            <h2 className="text-4xl font-extrabold mb-4">{t("E-Report")}</h2>
            <p className="text-lg opacity-90">{t("safeSpaceCommitment")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Lock className="h-14 w-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("confidential")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {t("confidentialDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="h-14 w-14 text-pink-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("compassionateSupport")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {t("compassionateSupportDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 text-gray-900 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Phone className="h-14 w-14 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("available247")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {t("available247Desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-transparent">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-extrabold mb-6">{t("readyFirstStep")}</h2>
          <p className="text-lg mb-10 opacity-90">{t("firstStepDesc")}</p>
          <div className="text-center">
            <Link to="/report">
              <Button className="px-10 py-4 text-lg font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-transform">
                {t("startReport")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Section - moved to bottom */}
      <section className="py-16 px-6 bg-white mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            {/* Ministry Logo */}
            <img
              src="/minstriy_logo.png"
              alt={t("ministryLogo")}
              className="h-16 w-16 object-contain"
            />

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer" className="p-3 bg-[#0088cc] text-white rounded-full hover:scale-110 transition">
                <FaTelegramPlane className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="p-3 bg-[#1877F2] text-white rounded-full hover:scale-110 transition">
                <FaFacebookF className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="bg-[#166866] text-white rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl font-bold mb-6">{t("immediateDanger")}</h2>
            <p className="text-lg mb-10">{t("emergencyDesc")}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4 bg-red-600/20 border border-red-400 rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                <Phone className="h-10 w-10 text-red-400" />
                <div>
                  <h3 className="text-xl font-semibold text-red-200">{t("call911")}</h3>
                  <p className="text-gray-100">{t("emergencyCallDesc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-yellow-600/20 border border-yellow-400 rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                <Phone className="h-10 w-10 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-semibold text-yellow-200">{t("nationalHotline")}</h3>
                  <p className="text-gray-100">{t("hotlineDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

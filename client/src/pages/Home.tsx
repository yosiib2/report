import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Heart, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            <img src="/minstriy_logo.png" alt={t("ministryLogo")} className="h-29 w-29 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">{t("safeSpace")}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">{t("homeDescription")}</p>
          <p className="text-lg mb-10 opacity-80">{t("homeSubDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">
                {t("reportIncident")}
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform">
              {t("getHelpNow")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">{t("whyChooseSafeSpace")}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t("safeSpaceCommitment")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Lock className="h-14 w-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("confidential")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  {t("confidentialDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="h-14 w-14 text-pink-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("compassionateSupport")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  {t("compassionateSupportDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Phone className="h-14 w-14 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("available247")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  {t("available247Desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("immediateDanger")}</h2>
          <p className="text-lg mb-6 opacity-90">{t("emergencyDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
              {t("call911")}
            </Button>
            <Button className="px-8 py-3 rounded-xl bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-transform">
              {t("nationalHotline")}
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">{t("readyFirstStep")}</h2>
          <p className="text-lg mb-10 opacity-90">{t("firstStepDesc")}</p>
          <Link to="/report">
            <Button className="px-10 py-4 text-lg font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-transform">
              {t("startReport")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

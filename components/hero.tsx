"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"

export function Hero() {
  const { t } = useLanguage()

  return (
    <main className="flex-1">
      <section className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">{t.home.hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-pretty">{t.home.hero.description}</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">{t.home.dataOverview.title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  {t.home.dataOverview.assetsUnderManagement}
                </h3>
                <div className="text-4xl md:text-5xl font-bold text-orange-500">{t.home.dataOverview.assetsValue}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">{t.home.dataOverview.tokenizedAssets}</h3>
                <div className="text-4xl md:text-5xl font-bold text-orange-500">
                  {t.home.dataOverview.tokenizedValue}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 text-balance">
            {t.home.empoweringValue.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">{t.home.empoweringValue.creation.title}</h3>
                <p className="text-gray-300 text-pretty">{t.home.empoweringValue.creation.description}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">{t.home.empoweringValue.registration.title}</h3>
                <p className="text-gray-300 text-pretty">{t.home.empoweringValue.registration.description}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">{t.home.empoweringValue.trading.title}</h3>
                <p className="text-gray-300 text-pretty">{t.home.empoweringValue.trading.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 text-balance">
            {t.home.ecosystem.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-red-400">{t.home.ecosystem.challenge.title}</h3>
              <p className="text-gray-300 text-pretty">{t.home.ecosystem.challenge.description}</p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-green-400">{t.home.ecosystem.solution.title}</h3>
              <p className="text-gray-300 text-pretty">{t.home.ecosystem.solution.description}</p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-blue-400">{t.home.ecosystem.ecosystem.title}</h3>
              <p className="text-gray-300 text-pretty">{t.home.ecosystem.ecosystem.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">{t.home.tokenizedIp.title}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/the-charlie-show-poster.jpg"
                    alt="The Charlie Show"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white text-center">{t.home.tokenizedIp.charlieShow}</h3>
              </CardContent>
            </Card>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{t.home.tokenizedIp.comingSoon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-400 text-center">{t.home.tokenizedIp.comingSoon}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Manage Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Digital Assets
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Comprehensive asset management platform for creators, brands, and enterprises to organize, protect, and
            monetize their digital content.
          </p>
        </div>

        {/* Asset Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Video Assets</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Store, organize, and protect your video content with advanced metadata management and AI-powered tagging.
            </p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Automatic content recognition</li>
              <li>• Version control and history</li>
              <li>• Rights management</li>
              <li>• Distribution tracking</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Image Assets</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Manage your visual content library with smart categorization and powerful search capabilities.
            </p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Visual similarity search</li>
              <li>• Batch processing tools</li>
              <li>• Format optimization</li>
              <li>• Usage analytics</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Audio Assets</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Organize and protect your audio content with advanced fingerprinting and licensing tools.
            </p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Audio fingerprinting</li>
              <li>• Royalty tracking</li>
              <li>• Quality analysis</li>
              <li>• Sync licensing</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Document Assets</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Secure document management with version control and collaborative editing features.
            </p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Document versioning</li>
              <li>• Access control</li>
              <li>• Collaborative editing</li>
              <li>• Digital signatures</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center bg-gray-900 p-12 rounded-lg border border-gray-800">
          <h2 className="text-3xl font-bold mb-8">Powerful Asset Management Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold mb-2 text-orange-500">Smart Organization</h4>
              <p className="text-gray-400 text-sm">
                AI-powered tagging and categorization for effortless asset discovery.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-500">Global Protection</h4>
              <p className="text-gray-400 text-sm">
                Monitor and protect your assets across all major platforms worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-500">Revenue Optimization</h4>
              <p className="text-gray-400 text-sm">
                Maximize monetization with intelligent licensing and distribution strategies.
              </p>
            </div>
          </div>
          <button className="mt-8 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all">
            Manage Your Assets
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

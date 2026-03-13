import {  Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                    <h3 className="font-semibold mb-4">About Rihla</h3>
                    <p className="text-gray-400 text-sm">
                        Discover the rich history, culture, and beauty of Syria through our comprehensive travel guide.
                    </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                            Home
                        </Link>
                        </li>
                        <li>
                        <Link to="/trips" className="text-gray-400 hover:text-white transition-colors">
                            Trips
                        </Link>
                        </li>
                        <li>
                        <Link to="/governorates" className="text-gray-400 hover:text-white transition-colors">
                            Governorates
                        </Link>
                        </li>
                    </ul>
                    </div>

                    {/* Contact */}
                    <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Email: info@syriatravelguide.com</li>
                        <li>Phone: +963 11 123 4567</li>
                    </ul>
                    </div>

                    {/* Social */}
                    <div>
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Facebook
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Instagram
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Twitter
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                <p>&copy; 2026 Rihla. All rights reserved.</p>
            </div>
        </div>
      </footer>
    );
}
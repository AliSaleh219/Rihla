import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">About Rihla</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Discover the rich history, culture, and beauty of Syria through our comprehensive travel guide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/trips" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                                    Trips
                                </Link>
                            </li>
                            <li>
                                <Link to="/governorates" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                                    Governorates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="break-all">
                                <span className="inline-block w-16">Email:</span>
                                <a href="mailto:info@syriatravelguide.com" className="hover:text-white transition-colors">
                                    info@syriatravelguide.com
                                </a>
                            </li>
                            <li>
                                <span className="inline-block w-16">Phone:</span>
                                <a href="tel:+963111234567" className="hover:text-white transition-colors">
                                    +963 11 123 4567
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-200"
                                aria-label="Facebook"
                            >
                                Facebook
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-200"
                                aria-label="Instagram"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-200"
                                aria-label="Twitter"
                            >
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
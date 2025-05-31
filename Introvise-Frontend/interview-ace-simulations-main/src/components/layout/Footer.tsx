import { Link } from "react-router-dom";
import { Video } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-brand-500" />
              <span className="font-bold text-lg text-brand-700">INTROVISE</span>
            </Link>
            <p className="text-sm text-gray-600">Ace your next interview with AI-powered practice and assessment tools.</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/practice" className="text-gray-600 hover:text-brand-500 transition-colors">Practice Interviews</Link></li>
              <li><Link to="/company" className="text-gray-600 hover:text-brand-500 transition-colors">Company Interviews</Link></li>
              <li><Link to="/openings" className="text-gray-600 hover:text-brand-500 transition-colors">Job Openings</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-brand-500 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-500 transition-colors">Blog</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-brand-500 transition-colors">Help Center</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-brand-500 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-500 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-500 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-brand-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">
            © {currentYear} INTROVISE. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-brand-500">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM18 17h-2.5v-4c0-1.1-.8-2-2-2s-2 .9-2 2v4H9v-7h2.5v1.2c.5-.8 1.5-1.4 2.5-1.4 1.9 0 3.5 1.6 3.5 3.5V17z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

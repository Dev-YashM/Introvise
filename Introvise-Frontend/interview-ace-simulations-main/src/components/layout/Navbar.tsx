
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRound, Video, Briefcase, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}`}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <Video className="h-6 w-6 mr-2 text-brand-500" />
          <span className="font-bold text-xl text-brand-700">INTROVISE</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/practice" className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors">Practice Interviews</Link>
          <Link to="/company" className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors">Company Interviews</Link>
          <Link to="/openings" className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors">Job Openings</Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors">
            <div className="flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
            </div>
          </Link>
        </nav>

        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-2 hidden md:flex" asChild>
            <Link to="/login">
              <UserRound className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
          <Button size="sm" className="hidden md:flex bg-brand-500 hover:bg-brand-600" asChild>
            <Link to="/for-employers">
              <Briefcase className="mr-2 h-4 w-4" /> For Employers
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}

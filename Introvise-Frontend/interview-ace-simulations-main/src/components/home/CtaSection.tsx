
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="py-20 bg-brand-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of job seekers who are landing their dream jobs with our interview preparation platform.
        </p>
        <Button size="lg" className="bg-white text-brand-900 hover:bg-gray-100" asChild>
          <Link to="/practice">Get Started Today</Link>
        </Button>
      </div>
    </section>
  );
}

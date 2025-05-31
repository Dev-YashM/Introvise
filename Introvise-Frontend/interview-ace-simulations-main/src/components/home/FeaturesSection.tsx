
import { Video, Users, Briefcase } from "lucide-react";

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center transition-all hover:shadow-lg">
    <div className="bg-brand-100 inline-flex p-4 rounded-full mb-6">
      <Icon className="h-8 w-8 text-brand-600" />
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function FeaturesSection() {
  const features = [
    {
      icon: Video,
      title: "Practice Interviews",
      description: "Simulate interviews with AI-generated questions tailored to your desired role and experience level."
    },
    {
      icon: Users,
      title: "Company Specific",
      description: "Prepare for interviews at top companies with simulations focused on their unique interview styles."
    },
    {
      icon: Briefcase,
      title: "Job Openings",
      description: "Apply directly to job openings and complete their specific interview assessments."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview Success Starts Here</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers comprehensive interview preparation with AI-powered feedback and industry-specific simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

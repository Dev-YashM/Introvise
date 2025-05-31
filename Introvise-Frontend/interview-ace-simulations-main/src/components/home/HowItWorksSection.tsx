
export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your profile and tell us about your career goals"
    },
    {
      number: 2,
      title: "Choose Interview",
      description: "Select from practice, company-specific, or job opening interviews"
    },
    {
      number: 3,
      title: "Complete Assessment",
      description: "Answer questions via video that are analyzed by our AI"
    },
    {
      number: 4,
      title: "Get Feedback",
      description: "Receive detailed analysis and tips to improve"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple process to improve your interview skills and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="bg-brand-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6">
                <span className="font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

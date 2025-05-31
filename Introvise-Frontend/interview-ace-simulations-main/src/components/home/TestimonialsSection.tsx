
type TestimonialProps = {
  image: string;
  name: string;
  position: string;
  testimonial: string;
};

const Testimonial = ({ image, name, position, testimonial }: TestimonialProps) => (
  <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
    <p className="text-gray-700">{testimonial}</p>
  </div>
);

export default function TestimonialsSection() {
  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Sarah Johnson",
      position: "Software Engineer at Google",
      testimonial: "\"The company-specific interview practice was exactly what I needed to prepare for my Google interviews. The questions were spot-on!\""
    },
    {
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "Michael Chen",
      position: "Product Manager at Amazon",
      testimonial: "\"After practicing with InterviewAce for two weeks, I felt so much more confident during my actual interviews. Highly recommend!\""
    },
    {
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      name: "Jessica Rodriguez",
      position: "UX Designer at Microsoft",
      testimonial: "\"The personalized feedback on my interview answers helped me identify and improve my weaknesses. Such a valuable tool!\""
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from users who landed their dream jobs with the help of our interview platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              image={testimonial.image}
              name={testimonial.name}
              position={testimonial.position}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

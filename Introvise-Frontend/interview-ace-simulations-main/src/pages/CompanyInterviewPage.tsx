
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Company } from "@/types";

// Mock company data (in real app, these would come from API)
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
    description: "A multinational technology company specializing in Internet-related services and products.",
  },
  {
    id: "2",
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/640px-Microsoft_logo.svg.png",
    description: "A multinational technology company developing, manufacturing, licensing, supporting, and selling computer software and consumer electronics.",
  },
  {
    id: "3",
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png",
    description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  },
  {
    id: "4",
    name: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/640px-Apple_logo_black.svg.png",
    description: "A multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
  },
  {
    id: "5",
    name: "Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/640px-Meta_Platforms_Inc._logo.svg.png",
    description: "A multinational technology conglomerate focusing on social media, metaverse, and other related services and products.",
  },
  {
    id: "6",
    name: "Netflix",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/640px-Netflix_2015_logo.svg.png",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
  },
  {
    id: "7",
    name: "Tesla",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/640px-Tesla_Motors.svg.png",
    description: "An American electric vehicle and clean energy company.",
  },
  {
    id: "8",
    name: "Twitter",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/640px-Logo_of_Twitter.svg.png",
    description: "An American microblogging and social networking service.",
  },
];

export default function CompanyInterviewPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredCompanies(mockCompanies);
    } else {
      const filtered = mockCompanies.filter((company) =>
        company.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleSelectCompany = (company: Company) => {
    navigate(`/company/${company.id}`, { state: { company } });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Company-Specific Interviews</h1>
          <p className="text-center text-gray-600 mb-8">
            Practice interviews tailored to specific companies and their interview styles
          </p>

          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSelectCompany(company)}
              >
                <CardContent className="p-0">
                  <div className="h-24 flex items-center justify-center p-4 bg-white border-b">
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {company.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No companies found</h3>
              <p className="text-gray-600">
                Try a different search term or browse all companies
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Show All Companies
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

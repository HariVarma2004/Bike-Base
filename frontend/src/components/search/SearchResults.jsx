// src/components/SearchResults.jsx
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layout/MainLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setIsLoading(false);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    setError("");
    
    try {
      // For development - mock data
      const mockBikes = [
        { 
          _id: "1", 
          name: "Mountain Explorer", 
          brand: "Trek", 
          category: "Mountain Bike",
          price: 1200,
          image: "/api/placeholder/300/200",
          description: "A rugged mountain bike for off-road adventures"
        },
        { 
          _id: "2", 
          name: "Road Warrior", 
          brand: "Specialized", 
          category: "Road Bike",
          price: 1500,
          image: "/api/placeholder/300/200",
          description: "A fast road bike for speed enthusiasts"
        },
        { 
          _id: "3", 
          name: "City Cruiser", 
          brand: "Giant", 
          category: "Hybrid Bike",
          price: 800,
          image: "/api/placeholder/300/200",
          description: "A comfortable bike for city commuting"
        },
      ];
      
      const filteredBikes = mockBikes.filter(bike =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Simulate API delay
      setTimeout(() => {
        setResults(filteredBikes);
        setIsLoading(false);
      }, 500);
      
      // For production:
      /*
      const response = await axios.get(`${API_BASE_URL}/api/bikes/search?q=${searchQuery}`);
      setResults(response.data);
      setIsLoading(false);
      */
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error("Search error:", err);
      setIsLoading(false);
    }
  };

  if (!query) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Search Bikes</h1>
          <p className="text-base-content/70">Enter a search term to find bikes</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Search Results for "{query}"
        </h1>
        
        {isLoading && (
          <div className="flex justify-center my-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}
        
        {error && (
          <div className="alert alert-error mb-6 max-w-2xl mx-auto">
            <span>{error}</span>
          </div>
        )}
        
        {!isLoading && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-base-content/70 mb-2">No results found for "{query}"</p>
            <p className="text-base-content/60">Try different keywords or browse our collection</p>
            <Link to="/explore" className="btn btn-primary mt-6">
              Browse All Bikes
            </Link>
          </div>
        )}
        
        {!isLoading && results.length > 0 && (
          <>
            <p className="text-base-content/70 mb-8">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((bike) => (
                <div key={bike._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                  <figure className="h-48">
                    <img 
                      src={bike.image || "/api/placeholder/300/200"} 
                      alt={bike.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-primary">{bike.name}</h2>
                    <p className="text-secondary font-semibold">{bike.brand}</p>
                    <p className="badge badge-outline">{bike.category}</p>
                    <p className="text-base-content/70 line-clamp-2">{bike.description}</p>
                    <p className="text-lg font-bold text-primary">${bike.price}</p>
                    <div className="card-actions justify-end mt-4">
                      <Link 
                        to={`/explore/bikespecs/${bike._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
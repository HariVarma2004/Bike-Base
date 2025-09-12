import { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  // Sample data 
  const [blogPosts] = useState([
    {
      id: 1,
      type: 'user_review',
      title: 'Amazing experience with the Trailblazer X3',
      author: 'Adventure Rider',
      date: '2023-10-15',
      excerpt: 'Just took my new Trailblazer X3 on a 200-mile trip through the mountains. The handling was impeccable even on rough terrain...',
      rating: 5,
      bikeModel: 'Trailblazer X3',
      avatar: '🚵'
    },
    {
      id: 2,
      type: 'admin_post',
      title: 'Introducing Our New Eco-Friendly Bike Line',
      author: 'Motovex Team',
      date: '2023-10-10',
      excerpt: 'We\'re excited to announce our new line of eco-friendly bikes made from recycled materials without compromising on performance...',
      avatar: '⚡'
    },
    {
      id: 3,
      type: 'user_review',
      title: 'Perfect commuter bike for city riding',
      author: 'Urban Cyclist',
      date: '2023-10-05',
      excerpt: 'I\'ve been using the CityGlide 500 for my daily commute for three months now. The lightweight frame makes it easy to carry up stairs...',
      rating: 4,
      bikeModel: 'CityGlide 500',
      avatar: '🚴'
    },
    {
      id: 4,
      type: 'admin_post',
      title: 'Winter Maintenance Tips for Your Bike',
      author: 'Motovex Team',
      date: '2023-09-28',
      excerpt: 'As winter approaches, it\'s important to prepare your bike for colder temperatures and potentially harsh conditions...',
      avatar: '🔧'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPosts = activeFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.type === activeFilter);

  return (
    <div className="p-4 md:p-6 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-primary">Motovex Community</h1>
        <p className="text-center mb-6 md:mb-8 text-base-content/70 text-sm sm:text-base">Rider experiences and official updates</p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-6 md:mb-8 gap-2 sm:gap-4">
          <button 
            className={`btn btn-sm sm:btn-md ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Posts
          </button>
          <button 
            className={`btn btn-sm sm:btn-md ${activeFilter === 'user_review' ? 'btn-secondary' : 'btn-outline'}`}
            onClick={() => setActiveFilter('user_review')}
          >
            Rider Reviews
          </button>
          <button 
            className={`btn btn-sm sm:btn-md ${activeFilter === 'admin_post' ? 'btn-accent' : 'btn-outline'}`}
            onClick={() => setActiveFilter('admin_post')}
          >
            Motovex News
          </button>
        </div>

        {/* Blog posts list */}
        <div className="space-y-4 md:space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 md:card-side">
              <figure className="p-4 md:p-6 md:min-w-[120px] flex items-center justify-center">
                <div className="text-4xl md:text-5xl">{post.avatar}</div>
              </figure>
              <div className="card-body p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`badge badge-sm ${post.type === 'user_review' ? 'badge-secondary' : 'badge-accent'}`}>
                    {post.type === 'user_review' ? 'Rider Review' : 'Official Post'}
                  </span>
                  {post.type === 'user_review' && (
                    <div className="rating rating-xs sm:rating-sm">
                      {[...Array(5)].map((_, i) => (
                        <input 
                          key={i}
                          type="radio" 
                          name={`rating-${post.id}`} 
                          className="mask mask-star-2 bg-orange-400" 
                          checked={i < post.rating}
                          readOnly
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <h2 className="card-title text-xl sm:text-2xl">{post.title}</h2>
                
                {post.type === 'user_review' && (
                  <p className="text-sm text-base-content/70">Bike Model: {post.bikeModel}</p>
                )}
                
                <p className="text-base-content/80 text-sm sm:text-base">{post.excerpt}</p>
                
                <div className="card-actions justify-between items-center mt-4 flex-col xs:flex-row gap-3 xs:gap-0">
                  <div className="flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span className="text-xs">{post.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{post.author}</p>
                      <p className="text-xs text-base-content/50">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="btn btn-primary btn-sm sm:btn-md"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-5xl mb-4">🚲</div>
            <h3 className="text-lg md:text-xl font-medium">No posts found</h3>
            <p className="text-base-content/70 text-sm md:text-base">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
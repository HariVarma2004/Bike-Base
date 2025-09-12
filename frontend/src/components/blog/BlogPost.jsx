import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with API call
  useEffect(() => {
    const samplePosts = {
      'amazing-experience-trailblazer': {
        id: 1,
        type: 'user_review',
        title: 'Amazing experience with the Trailblazer X3',
        author: 'Adventure Rider',
        date: '2023-10-15',
        content: `
          <p>Just took my new Trailblazer X3 on a 200-mile trip through the mountains. The handling was impeccable even on rough terrain.</p>
          <p>The suspension system absorbed all the bumps, and the gear shifting was smooth as butter. I especially appreciated the comfortable seat during long rides.</p>
          <p>Would highly recommend this bike for anyone who loves adventure riding!</p>
        `,
        rating: 5,
        bikeModel: 'Trailblazer X3',
        avatar: '🚵'
      },
      'eco-friendly-bike-line': {
        id: 2,
        type: 'admin_post',
        title: 'Introducing Our New Eco-Friendly Bike Line',
        author: 'Motovex Team',
        date: '2023-10-10',
        content: `
          <p>We're excited to announce our new line of eco-friendly bikes made from recycled materials without compromising on performance.</p>
          <p>Each bike in this line uses up to 70% recycled aluminum and comes with our new eco-friendly tire compound that lasts 30% longer than standard tires.</p>
          <p>Join us in our mission to make cycling more sustainable!</p>
        `,
        avatar: '⚡'
      }
    };

    const foundPost = samplePosts[slug];
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 bg-base-100 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 bg-base-100 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="btn btn-ghost btn-sm mb-6">
          ← Back to Blog
        </Link>

        <article className="prose lg:prose-xl max-w-none">
          <div className="flex items-center gap-2 mb-4">
            <span className={`badge ${post.type === 'user_review' ? 'badge-secondary' : 'badge-accent'}`}>
              {post.type === 'user_review' ? 'Rider Review' : 'Official Post'}
            </span>
            {post.type === 'user_review' && (
              <div className="rating rating-sm">
                {[...Array(5)].map((_, i) => (
                  <input 
                    key={i}
                    type="radio" 
                    className="mask mask-star-2 bg-orange-400" 
                    checked={i < post.rating}
                    readOnly
                  />
                ))}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          {post.type === 'user_review' && (
            <p className="text-lg text-base-content/70 mb-6">Bike Model: {post.bikeModel}</p>
          )}
          
          <div className="flex items-center gap-3 mb-8">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-lg">{post.avatar}</span>
              </div>
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-base-content/50">{new Date(post.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div 
            className="blog-content mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="divider"></div>

          <div className="flex justify-between items-center">
            <Link to="/blog" className="btn btn-ghost">
              ← Back to all posts
            </Link>
            {post.type === 'admin_post' && (
              <button className="btn btn-primary">Share this post</button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
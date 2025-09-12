import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    pending: 0
  });

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs/user/my-blogs');
      setBlogs(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (blogs) => {
    const stats = {
      total: blogs.length,
      published: blogs.filter(blog => blog.status === 'published' && blog.isApproved).length,
      drafts: blogs.filter(blog => blog.status === 'draft').length,
      pending: blogs.filter(blog => blog.status === 'published' && !blog.isApproved).length
    };
    setStats(stats);
  };

  const getStatusBadge = (status, isApproved) => {
    if (status === 'published' && isApproved) {
      return <span className="badge badge-success gap-1">Published</span>;
    } else if (status === 'published' && !isApproved) {
      return <span className="badge badge-warning gap-1">Pending Approval</span>;
    } else if (status === 'draft') {
      return <span className="badge badge-info gap-1">Draft</span>;
    } else {
      return <span className="badge badge-error gap-1">Archived</span>;
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      calculateStats(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    if (filter === 'published') return blog.status === 'published' && blog.isApproved;
    if (filter === 'drafts') return blog.status === 'draft';
    if (filter === 'pending') return blog.status === 'published' && !blog.isApproved;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-8 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Blog Posts</h1>
            <p className="text-base-content/70 mt-1">Manage your biking stories and experiences</p>
          </div>
          <Link to="/blog/edit" className="btn btn-primary gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Post
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Total Posts</div>
            <div className="stat-value text-primary">{stats.total}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Published</div>
            <div className="stat-value text-success">{stats.published}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Drafts</div>
            <div className="stat-value text-info">{stats.drafts}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{stats.pending}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter('all')}
          >
            All Posts
          </button>
          <button 
            className={`btn btn-sm ${filter === 'published' ? 'btn-success' : 'btn-ghost'}`}
            onClick={() => setFilter('published')}
          >
            Published
          </button>
          <button 
            className={`btn btn-sm ${filter === 'drafts' ? 'btn-info' : 'btn-ghost'}`}
            onClick={() => setFilter('drafts')}
          >
            Drafts
          </button>
          <button 
            className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-ghost'}`}
            onClick={() => setFilter('pending')}
          >
            Pending Review
          </button>
        </div>

        {/* Blog Posts List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredBlogs.map(blog => (
            <div key={blog._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="card-title text-xl">{blog.title}</h2>
                    <p className="text-base-content/70 mt-2 line-clamp-2">
                      {blog.excerpt || blog.content.substring(0, 120)}...
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {getStatusBadge(blog.status, blog.isApproved)}
                      <span className="text-sm text-base-content/60">
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      {blog.updatedAt !== blog.createdAt && (
                        <span className="text-sm text-base-content/60">
                          Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link 
                      to={`/blog/edit/${blog._id}`} 
                      className="btn btn-outline btn-sm gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    
                    {blog.status === 'published' && blog.isApproved && (
                      <Link 
                        to={`/blog/${blog.slug}`} 
                        className="btn btn-primary btn-sm gap-1"
                        target="_blank"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                    )}
                    
                    <button 
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-error btn-sm gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12 bg-base-100 rounded-lg shadow">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-semibold mb-2">
              {filter === 'all' ? 'No blog posts yet' : `No ${filter} posts`}
            </h2>
            <p className="text-base-content/70 mb-6 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Share your biking adventures, maintenance tips, and road experiences with the Motovex community!'
                : `You don't have any ${filter} posts at the moment.`}
            </p>
            <Link to="/blog/edit" className="btn btn-primary gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogDashboard;
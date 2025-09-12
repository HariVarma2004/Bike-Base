import { useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'user_review',
    bikeModel: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission to your API
    console.log('Form submitted:', formData);
    alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Type</span>
            </label>
            <select 
              name="type" 
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="user_review">Rider Review</option>
              <option value="admin_post">Official Post</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Enter post title"
              required
            />
          </div>

          {formData.type === 'user_review' && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bike Model</span>
                </label>
                <input
                  type="text"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Which bike model are you reviewing?"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <div className="rating rating-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating"
                      value={star}
                      checked={formData.rating == star}
                      onChange={handleChange}
                      className="mask mask-star-2 bg-orange-400"
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="textarea textarea-bordered h-48"
              placeholder="Write your post content here..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            <button type="button" className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
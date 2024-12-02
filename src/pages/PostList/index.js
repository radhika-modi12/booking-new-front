import { useEffect, useState } from 'react';
import api from '../../../src/axiosConfig';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {        
      const response = await api.post('/post/getPost');
      setPosts(response.data);
      const initialLikes = {};
      response.data.forEach((post) => {
        initialLikes[post.id] = post.likes;  // Assume `liked` is a boolean in response
      });
      console.log(initialLikes)
    } catch (err) {
    //   setError('Failed to load posts');
    }
  };
  const fetchPostsLike = async (postId) => {
    try { 
        const post_id = postId;
        const user_id = localStorage.getItem('userId');
        const count_detail = {post_id,user_id}    
      const response = await api.post('/post/like-count',count_detail);      
      setLikeCount(response.data)
    } catch (err) {
    //   setError('Failed to load posts');
    }
  };
  const fetchFollowersLike = async (postId) => {
    try { 
        const post_id = postId;
        const user_id = localStorage.getItem('userId');
        const count_detail = {post_id,user_id}    
      const response = await api.post('/post/follow-count',count_detail);      
      setFollowCount(response.data)
    } catch (err) {
    //   setError('Failed to load posts');
    }
  };

  const handleLike = async (postId) => {
    try {
        const post_id = postId;
        const user_id = localStorage.getItem('userId');
        const post_like_detail = {post_id,user_id}
      const response = await api.post(`/post/togglePost`,post_like_detail);
      fetchPosts()   
      fetchPostsLike(postId)
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleFollow = async (postId) => {
    try {
        const userId = localStorage.getItem('userId');
        const post_follow_detail = {postId,userId}
      const response = await api.post(`/post/toggleFollow`,post_follow_detail);
      fetchPosts()   
      fetchFollowersLike(postId)
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="post-list container">
  <div className="row">
    {posts.map((post) => (
      <div key={post.id} className="col-md-4 mb-4 mt-4">
        <div className="post card">
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">{post.content}</p>
            <img
              src={post.image}
              alt={post.title}
              className="post-image img-fluid rounded mb-3"
              style={{height:"200px",width:"350px"}}
            />
            <div className="row col-md-12" style={{
    marginLeft:"16%"
            }}>
            <div className="d-flex align-items-center col-md-4">
              <button
                onClick={() => handleLike(post.id)}
                className="btn btn-primary me-2"
              >
                {likeCount < 1 ? 'Unlike' : 'Like'}
              </button>
              <span>({post.likes})</span>
            </div>
            <div className="d-flex align-items-center col-md-4">
              <button
                onClick={() => handleFollow(post.id)}
                className="btn btn-secondary me-2"
              >
                {followCount < 1 ? 'Unfollow' : 'Follow'}
              </button>
              <span>({post.followers})</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
};

export default PostList;

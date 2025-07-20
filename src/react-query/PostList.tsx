import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePosts(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const uniqueUserIds = [...new Set(posts?.map((post) => post.userId))];
  // Extract unique userIds from posts, removing duplicates,set removes duplicates

  return (
    <>
      <select
        className="form-select mb-3"
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId} //
      >
        <option value="">select-user</option>
        {uniqueUserIds?.map((id) => (
          <option key={id} value={id}>
            User {id}
          </option>
        ))}
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, likePost } from '../api.js';

function PostItem({ post }) {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['posts'] });

  const like = useMutation({ mutationFn: likePost, onSuccess: refresh });
  const remove = useMutation({ mutationFn: deletePost, onSuccess: refresh });

  return (
    <li className="post-item">
      <div className="post-info">
        <strong>{post.title}</strong>
        <p>작성자 {post.author} · 좋아요 {post.likes}</p>
      </div>
      <div className="post-actions">
        <button onClick={() => like.mutate(post)} disabled={like.isPending}>
          좋아요
        </button>
        <button onClick={() => remove.mutate(post.id)} disabled={remove.isPending}>
          삭제
        </button>
      </div>
    </li>
  );
}

export default PostItem;
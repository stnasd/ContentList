import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useLazyGetPostQuery } from "../../features/apiSlice";
import { useEffect, useState } from "react";
import { IItemid } from "../../types/types";

export const PostInfoPage = () => {
  const [post, setPost] = useState<IItemid | undefined>(undefined);

  const { id } = useParams<{ id: string }>();
  const [trigger] = useLazyGetPostQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await trigger(id);
        if (data) {
          setPost(data);
        }
      }
    };

    fetchData();
  }, [id, trigger]);

  return (
    <div className={styles.post__container}>
      {post && (
        <>
          <div className={styles.post__info}>
            <p className={styles.post__info_userId}>
              <span>UserId:</span> {post.userId}
            </p>
            <p className={styles.post__info_id}>
              <span>Id:</span> {post.id}
            </p>
            <p className={styles.post__info_title}>
              <span>Title:</span> {post.title}
            </p>
            <p className={styles.post__info_body}>
              <span>Body:</span> {post.body}
            </p>
          </div>
          <Link to="/" className={styles.back__button}>
            <div>Назад</div>
          </Link>
        </>
      )}
    </div>
  );
};
export default PostInfoPage;

import Button from "../../ui/Button/Button.jsx";
import "./BlogCard.scss";

export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <div className="blog-card__media">
        {post.image ? <img src={post.image} alt="" /> : <span className="blog-card__placeholder" />}
      </div>
      <p className="blog-card__meta">
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>{post.tag}</span>
      </p>
      <h2 className="blog-card__title">{post.title}</h2>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <Button variant="text">Read more</Button>
    </article>
  );
}

import "./BlogSidebar.scss";

export default function BlogSidebar({ categories = [], recentPosts = [] }) {
  return (
    <aside className="blog-sidebar">
      <form className="blog-sidebar__search" onSubmit={(event) => event.preventDefault()}>
        <input type="search" aria-label="Search posts" />
      </form>
      <section>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <span>{category.name}</span>
              <span>{category.count}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Recent Posts</h2>
        <ul className="blog-sidebar__posts">
          {recentPosts.map((post) => (
            <li key={post.title}>
              <span className="blog-sidebar__thumb" />
              <span>
                <strong>{post.title}</strong>
                <small>{post.date}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaArrowRight } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author ? post.frontmatter.author : meta_author;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-body p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl dark:border-darkmode-border/50 dark:bg-darkmode-theme-dark/30">
      <div className="relative overflow-hidden rounded-xl">
        {post.frontmatter.image && (
          <ImageFallback
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
        )}
        <ul className="absolute top-3 left-3 flex flex-wrap gap-1">
          {post.frontmatter.categories.map((tag, index) => (
            <li
              className="rounded-full bg-primary/95 px-3 py-0.5 font-secondary text-[10px] font-bold uppercase tracking-wider text-white"
              key={"tag-" + index}
            >
              <Link href={`/categories/${tag.replace(" ", "-")}`}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-5">
        <div className="flex items-center gap-3 text-xs text-light dark:text-darkmode-text/70 mb-2">
          <span className="flex items-center gap-1">
            <FaRegCalendar />
            {dateFormat(post.frontmatter.date)}
          </span>
        </div>
        
        <h3 className="h5 font-bold mb-3 text-dark dark:text-white transition-colors duration-200 group-hover:text-primary">
          <Link href={`/${blog_folder}/${post.slug}`} className="block">
            {post.frontmatter.title}
          </Link>
        </h3>
        
        <p className="text-sm leading-relaxed text-text dark:text-darkmode-text/80 mb-5">
          {post.content.slice(0, Number(summary_length))}...
        </p>
        
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-200 hover:gap-3"
          href={`/${blog_folder}/${post.slug}`}
        >
          Explore Architecture
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default Post;
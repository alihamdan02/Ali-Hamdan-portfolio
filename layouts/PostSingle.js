import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import InnerPagination from "@layouts/components/InnerPagination";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import Post from "./partials/Post";
import shortcodes from "./shortcodes/all";
const { disqus } = config;
const { meta_author } = config.metadata;

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { theme } = useTheme();
  const author = frontmatter.author ? frontmatter.author : meta_author;
  let disqusConfig = config.disqus.settings;
  disqusConfig.identifier = frontmatter.disqusId
    ? frontmatter.disqusId
    : config.settings.blog_folder + "/" + slug;

  return (
    <Base title={title} description={description}>
      <section className="section single-blog mt-6">
        {/* تم توسيط الحاوية وجعل العرض مناسباً للقراءة بـ max-w-4xl مع mx-auto */}
        <div className="container max-w-4xl mx-auto px-4">
          <article className="w-full">
            <div className="relative mb-8">
              {image && (
                <ImageFallback
                  src={image}
                  height="500"
                  width="1000"
                  alt={title}
                  className="rounded-2xl w-full object-cover max-h-[450px]"
                />
              )}
              {categories && categories.length > 0 && (
                <ul className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  {categories.map((tag, index) => (
                    <li
                      className="inline-flex h-7 items-center rounded-full bg-primary px-3 text-xs font-bold text-white shadow-md"
                      key={"tag-" + index}
                    >
                      <Link
                        className="capitalize"
                        href={`/categories/${tag.replace(" ", "-")}`}
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {config.settings.InnerPaginationOptions.enableTop && (
              <div className="mt-4">
                <InnerPagination posts={posts} date={date} />
              </div>
            )}

            {markdownify(title, "h1", "text-3xl lg:text-[42px] font-bold tracking-tight mt-6 mb-4 text-dark dark:text-white")}

            <ul className="flex items-center space-x-6 mb-8 text-text/80 dark:text-darkmode-text/80 border-b border-border/40 dark:border-darkmode-border/40 pb-4">
              <li>
                <Link
                  className="inline-flex items-center font-secondary text-xs leading-3 hover:text-primary transition-colors"
                  href="/about"
                >
                  <FaUserAlt className="mr-1.5 text-primary" />
                  {author}
                </Link>
              </li>
              <li className="inline-flex items-center font-secondary text-xs leading-3">
                <FaRegCalendar className="mr-1.5 text-primary" />
                {dateFormat(date)}
              </li>
            </ul>

            <div className="content mb-16 text-left">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>

            {config.settings.InnerPaginationOptions.enableBottom && (
              <InnerPagination posts={posts} date={date} />
            )}
          </article>

          <div className="mt-16">
            {disqus.enable && (
              <DiscussionEmbed
                key={theme}
                shortname={disqus.shortname}
                config={disqusConfig}
              />
            )}
          </div>

          {/* Related posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-border/40 dark:border-darkmode-border/40">
              <h2 className="section-title text-2xl font-bold mb-8">Related Projects & Systems</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 1).map((post, index) => (
                  <div key={"post-" + index} className="w-full">
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
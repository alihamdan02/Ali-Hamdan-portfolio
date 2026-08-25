import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
}) => {
  const sortPostByDate = sortByDate(posts);
  const showPosts = pagination;

  return (
    <Base>
      {/* Banner Section */}
      <section className="section banner relative pb-0 overflow-hidden">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full opacity-60"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className="mt-12 text-center lg:mt-0 lg:text-left lg:col-6 animate-intro delay-1">
              <div className="banner-title mb-4">
                {markdownify(banner.title, "h1", "font-bold tracking-tight text-dark dark:text-white")}
                {markdownify(banner.title_small, "span", "block text-lg font-medium text-primary mt-2")}
              </div>
              {markdownify(banner.content, "p", "mt-4 text-base text-text dark:text-darkmode-text/90 max-w-lg")}
              {banner.button.enable && (
                <div className="mt-6">
                  <Link
                    className="btn btn-primary"
                    href={banner.button.link}
                    rel={banner.button.rel}
                  >
                    {banner.button.label}
                  </Link>
                </div>
              )}
            </div>
            
            {/* Elegant Squircle Frame for JPEG non-transparent backgrounds */}
            {banner.image_enable && (
              <div className="col-9 lg:col-6 animate-intro delay-2 flex justify-center">
                <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-border/40 bg-[#707271] p-1 shadow-2xl transition-transform duration-700 hover:scale-[1.02] max-w-[360px] w-full aspect-square">
                  <ImageFallback
                    className="w-full h-full object-cover rounded-[2.2rem]"
                    src={banner.image}
                    width={500}
                    height={500}
                    priority={true}
                    alt="Ali Hamdan"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Width Technical Projects Section */}
      <section className="section py-12">
        <div className="container">
          <div className="animate-intro delay-3">
            {recent_posts.enable && (
              <div>
                {markdownify(recent_posts.title, "h2", "section-title font-bold text-dark dark:text-white mb-10")}
                <div className="rounded-2xl border border-border/40 bg-theme-light/10 p-6 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sortPostByDate.slice(0, 3).map((post) => (
                      <div key={post.slug} className="w-full">
                        <Post post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
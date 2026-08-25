import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import ImageFallback from "./components/ImageFallback";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, education, experience } = frontmatter;

  return (
    <section className="section mt-12 animate-intro delay-1">
      <div className="container">
        {image && (
          <div className="mb-12 overflow-hidden rounded-2xl">
            <ImageFallback
              src={image}
              width={1298}
              height={616}
              alt={title}
              className="w-full object-cover rounded-2xl"
            />
          </div>
        )}
        
        <div className="max-w-3xl mx-auto text-left">
          {markdownify(title, "h1", "h1 text-left lg:text-[48px] font-bold tracking-tight mb-8 text-dark dark:text-white")}
          
          <div className="content text-left text-base leading-relaxed text-text dark:text-darkmode-text/90">
            <MDXRemote {...mdxContent} components={shortcodes} />
          </div>
        </div>

        {/* Dynamic Skills and Education Grid */}
        <div className="row mt-16 lg:flex-nowrap gap-6 justify-center">
          <div className="lg:col-6 w-full animate-intro delay-2">
            <div className="h-full rounded-2xl border border-border/40 bg-theme-light/10 p-8 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/10 shadow-sm">
              {markdownify(education.title, "h2", "section-title font-bold text-dark dark:text-white mb-8")}
              <div className="space-y-6">
                {education.degrees.map((degree, index) => (
                  <div className="border-l-2 border-primary/50 pl-4 py-1" key={"degree-" + index}>
                    <h4 className="text-lg font-bold text-dark dark:text-white">
                      {degree.university}
                    </h4>
                    <p className="mt-1 text-sm text-text/90 dark:text-darkmode-text/80 whitespace-pre-line">
                      {degree.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-6 w-full animate-intro delay-3">
            <div className="h-full rounded-2xl border border-border/40 bg-theme-light/10 p-8 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/10 shadow-sm">
              {markdownify(experience.title, "h2", "section-title font-bold text-dark dark:text-white mb-8")}
              <div className="flex flex-wrap gap-2">
                {experience?.list?.map((item, index) => (
                  <span
                    className="inline-block rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/20 dark:bg-primary/5 dark:hover:bg-primary/10"
                    key={"experience-" + index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
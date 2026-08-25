import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, form_action, phone, mail, location } = frontmatter;

  return (
    <section className="relative py-4 lg:py-8 overflow-hidden animate-intro delay-1">
      {/* Background Map secured absolutely so it never pushes content down */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
        <ImageFallback
          className="w-full h-full object-cover"
          src={"/images/map.svg"}
          width={1920}
          height={1080}
          alt="map bg"
          priority={true}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="row pb-6 items-center">
          <div className="lg:col-5 text-center lg:text-left">
            {markdownify(
              title,
              "h1",
              "h2 my-2 lg:my-4 font-bold tracking-tight lg:text-[48px] leading-tight text-dark dark:text-white"
            )}
            <p className="text-base text-text dark:text-darkmode-text/80 max-w-sm mx-auto lg:mx-0 mt-4">
              Feel free to reach out for enterprise collaborations, on-premise AI deployments, or general inquiries.
            </p>
          </div>
          
          <div className="contact-form-wrapper rounded-2xl border border-border/40 bg-body p-8 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/10 shadow-lg lg:col-7 mt-6 lg:mt-0 animate-intro delay-2">
            <h2 className="h4 font-bold flex items-center justify-center lg:justify-start gap-1 mb-6 text-dark dark:text-white">
              Send A Message
              <span className="inline-flex items-center text-primary">
                Directly
                <BsArrowRightShort />
              </span>
            </h2>
            
            <form className="contact-form space-y-6" method="POST" action={form_action}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-dark dark:text-white/80" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="form-input w-full rounded-lg border border-border/40 px-4 py-3 focus:border-primary/60 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/20"
                    name="name"
                    type="text"
                    placeholder="Thomas Milano"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-dark dark:text-white/80" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="form-input w-full rounded-lg border border-border/40 px-4 py-3 focus:border-primary/60 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/20"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-dark dark:text-white/80" htmlFor="subject">
                  Subject
                </label>
                <input
                  className="form-input w-full rounded-lg border border-border/40 px-4 py-3 focus:border-primary/60 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/20"
                  name="subject"
                  type="text"
                  placeholder="AI Project Collaboration"
                  required
                />
              </div>
              
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-dark dark:text-white/80" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  className="form-textarea w-full rounded-lg border border-border/40 px-4 py-3 focus:border-primary/60 dark:border-darkmode-border/40 dark:bg-darkmode-theme-dark/20"
                  placeholder="Tell me about your system requirements..."
                  rows="4"
                  required
                />
              </div>
              
              <button className="btn btn-primary w-full md:w-auto" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Contact Details Grid */}
        <div className="row mt-8 gap-4 justify-center animate-intro delay-3">
          {phone && (
            <div className="md:col-4">
              <Link
                href={`tel:${phone}`}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-theme-light/5 text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 dark:border-darkmode-border/40"
              >
                <FaPhoneAlt className="text-xl mb-2" />
                <span className="text-xs text-text dark:text-darkmode-text/70 mb-1">Call Me</span>
                <p className="text-sm font-bold text-dark dark:text-white">{phone}</p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-4">
              <Link
                href={`mailto:${mail}`}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-theme-light/5 text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 dark:border-darkmode-border/40"
              >
                <FaEnvelope className="text-xl mb-2" />
                <span className="text-xs text-text dark:text-darkmode-text/70 mb-1">Email Me</span>
                <p className="text-sm font-bold text-dark dark:text-white">{mail}</p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-4">
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-theme-light/5 text-primary dark:border-darkmode-border/40">
                <FaMapMarkerAlt className="text-xl mb-2" />
                <span className="text-xs text-text dark:text-darkmode-text/70 mb-1">Location</span>
                <p className="text-sm font-bold text-dark dark:text-white">{location}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
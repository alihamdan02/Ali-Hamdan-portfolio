import {
  IoCall,
  IoLocation,
  IoLogoBehance,
  IoLogoBitbucket,
  IoLogoCodepen,
  IoLogoDiscord,
  IoLogoDribbble,
  IoLogoFacebook,
  IoLogoFoursquare,
  IoLogoGithub,
  IoLogoGitlab,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoMedium,
  IoLogoPinterest,
  IoLogoReddit,
  IoLogoRss,
  IoLogoSkype,
  IoLogoSlack,
  IoLogoSnapchat,
  IoLogoSoundcloud,
  IoLogoStackoverflow,
  IoLogoTiktok,
  IoLogoTumblr,
  IoLogoTwitter,
  IoLogoVimeo,
  IoLogoVk,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMail,
} from "react-icons/io5";

import { SiHuggingface } from "react-icons/si";

const Social = ({ source = {}, className }) => {
  const {
    facebook,
    stackoverflow,
    twitter,
    instagram,
    youtube,
    linkedin,
    github,
    gitlab,
    discord,
    slack,
    medium,
    codepen,
    bitbucket,
    dribbble,
    behance,
    pinterest,
    soundcloud,
    tumblr,
    reddit,
    vk,
    whatsapp,
    snapchat,
    vimeo,
    tiktok,
    foursquare,
    rss,
    email,
    phone,
    address,
    skype,
    website,
  } = source;

  return (
    <ul className={className}>
      {facebook && (
        <li className="inline-block">
          <a
            aria-label="Facebook"
            href={facebook}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoFacebook />
          </a>
        </li>
      )}

      {stackoverflow && (
        <li className="inline-block">
          <a
            aria-label="Stack Overflow"
            href={stackoverflow}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoStackoverflow />
          </a>
        </li>
      )}

      {twitter && (
        <li className="inline-block">
          <a
            aria-label="Twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoTwitter />
          </a>
        </li>
      )}

      {instagram && (
        <li className="inline-block">
          <a
            aria-label="Instagram"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoInstagram />
          </a>
        </li>
      )}

      {youtube && (
        <li className="inline-block">
          <a
            aria-label="YouTube"
            href={youtube}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoYoutube />
          </a>
        </li>
      )}

      {linkedin && (
        <li className="inline-block">
          <a
            aria-label="LinkedIn"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoLinkedin />
          </a>
        </li>
      )}

      {github && (
        <li className="inline-block">
          <a
            aria-label="GitHub"
            href={github}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoGithub />
          </a>
        </li>
      )}

      {gitlab && (
        <li className="inline-block">
          <a
            aria-label="GitLab"
            href={gitlab}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoGitlab />
          </a>
        </li>
      )}

      {discord && (
        <li className="inline-block">
          <a
            aria-label="Discord"
            href={discord}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoDiscord />
          </a>
        </li>
      )}

      {slack && (
        <li className="inline-block">
          <a
            aria-label="Slack"
            href={slack}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoSlack />
          </a>
        </li>
      )}

      {medium && (
        <li className="inline-block">
          <a
            aria-label="Medium"
            href={medium}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoMedium />
          </a>
        </li>
      )}

      {codepen && (
        <li className="inline-block">
          <a
            aria-label="CodePen"
            href={codepen}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoCodepen />
          </a>
        </li>
      )}

      {bitbucket && (
        <li className="inline-block">
          <a
            aria-label="Bitbucket"
            href={bitbucket}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoBitbucket />
          </a>
        </li>
      )}

      {dribbble && (
        <li className="inline-block">
          <a
            aria-label="Dribbble"
            href={dribbble}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoDribbble />
          </a>
        </li>
      )}

      {behance && (
        <li className="inline-block">
          <a
            aria-label="Behance"
            href={behance}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoBehance />
          </a>
        </li>
      )}

      {pinterest && (
        <li className="inline-block">
          <a
            aria-label="Pinterest"
            href={pinterest}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoPinterest />
          </a>
        </li>
      )}

      {soundcloud && (
        <li className="inline-block">
          <a
            aria-label="SoundCloud"
            href={soundcloud}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoSoundcloud />
          </a>
        </li>
      )}

      {tumblr && (
        <li className="inline-block">
          <a
            aria-label="Tumblr"
            href={tumblr}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoTumblr />
          </a>
        </li>
      )}

      {reddit && (
        <li className="inline-block">
          <a
            aria-label="Reddit"
            href={reddit}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoReddit />
          </a>
        </li>
      )}

      {vk && (
        <li className="inline-block">
          <a
            aria-label="VK"
            href={vk}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoVk />
          </a>
        </li>
      )}

      {whatsapp && (
        <li className="inline-block">
          <a
            aria-label="WhatsApp"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoWhatsapp />
          </a>
        </li>
      )}

      {snapchat && (
        <li className="inline-block">
          <a
            aria-label="Snapchat"
            href={snapchat}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoSnapchat />
          </a>
        </li>
      )}

      {vimeo && (
        <li className="inline-block">
          <a
            aria-label="Vimeo"
            href={vimeo}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoVimeo />
          </a>
        </li>
      )}

      {tiktok && (
        <li className="inline-block">
          <a
            aria-label="TikTok"
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoTiktok />
          </a>
        </li>
      )}

      {foursquare && (
        <li className="inline-block">
          <a
            aria-label="Foursquare"
            href={foursquare}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoFoursquare />
          </a>
        </li>
      )}

      {skype && (
        <li className="inline-block">
          <a
            aria-label="Skype"
            href={skype}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoSkype />
          </a>
        </li>
      )}

      {website && (
        <li className="inline-block">
          <a
            aria-label="Hugging Face"
            href={website}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <SiHuggingface className="text-xl" />
          </a>
        </li>
      )}

      {rss && (
        <li className="inline-block">
          <a
            aria-label="RSS Feed"
            href={rss}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoRss />
          </a>
        </li>
      )}

      {email && (
        <li className="inline-block">
          <a aria-label="Email" href={`mailto:${email}`}>
            <IoMail />
          </a>
        </li>
      )}

      {phone && (
        <li className="inline-block">
          <a aria-label="Telephone" href={`tel:${phone}`}>
            <IoCall />
          </a>
        </li>
      )}

      {address && (
        <li className="inline-block">
          <a
            aria-label="Location"
            href={address}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLocation />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Social;
import { Fragment } from "react";

/**
 * The headline rises word by word from behind a mask. Pure CSS, rendered on the server,
 * so the words start moving at first paint instead of waiting for JavaScript.
 * The space between words sits outside each mask; inside an inline-block it would collapse.
 */
export default function HeroTitle({ text, id }: { text: string; id: string }) {
  const words = text.split(" ");
  return (
    <h1 className="display hero-title" id={id} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="hw" aria-hidden="true">
            <span className="hw-in" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

"use client";

export default function CmdButton() {
  return (
    <button type="button" className="b-kbtn" aria-label="Open quick menu" onClick={() => window.dispatchEvent(new Event("open-cmdk"))}>
      <svg className="b-kicon" viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L14 14" />
      </svg>
      <span>Search</span>
      <kbd>Ctrl K</kbd>
    </button>
  );
}

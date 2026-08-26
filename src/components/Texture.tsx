/**
 * Global SVG filters. Rendered once, invisible, referenced from CSS.
 * `roughen` is what gives headlines their chipped, printed-on-paper edge.
 */
export function TextureDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <defs>
        <filter id="roughen">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="roughen-soft">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.07"
            numOctaves="3"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

/** The hand-drawn rule that sits under the name. */
export function InkRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 12"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-[10px] w-full ${className}`}
    >
      <path
        d="M2 7.5c48-2.4 96-3.6 144-3.1 62 .6 124 3.4 186 3.9 55 .4 110-1.6 165-3.4 33-1.1 66-1.9 99-1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M18 10c70-1.8 141-2.6 211-2 48 .4 96 1.8 144 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

/**
 * Torn-edge frame. Wraps video and stills so they sit on the page
 * like something pasted down rather than a clean rectangle.
 */
export function TornFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-[7px] bg-ink/25"
        style={{ filter: "url(#roughen)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

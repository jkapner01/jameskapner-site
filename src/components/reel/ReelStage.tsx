"use client";

import { useEffect } from "react";
import { useVimeo } from "./useVimeo";
import { CommandBar } from "./CommandBar";

/**
 * Full-bleed reel. The Vimeo iframe is scaled to cover the viewport
 * (object-fit doesn't apply to iframes, so the 16:9 frame is blown up
 * and centred instead), with our own controls layered over it.
 */
export function ReelStage({
  url,
  poster,
}: {
  url: string;
  poster?: string;
}) {
  const { hostRef, state, toggle, setMuted, seek } = useVimeo(url);

  // Keyboard transport. Ignored while typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.key === "m" || e.key === "M") {
        setMuted(!state.muted);
      } else if (e.key === "ArrowLeft") {
        seek(state.current - 5);
      } else if (e.key === "ArrowRight") {
        seek(state.current + 5);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, setMuted, seek, state.muted, state.current]);

  return (
    <div className="fixed inset-0 bg-black">
      {/* video plane */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={hostRef}
          /* The SDK injects a fixed-size iframe; force it to fill the host. */
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full"
          style={{
            // cover: whichever axis is short gets overscanned
            width: "max(100vw, calc(100vh * (16 / 9)))",
            height: "max(100vh, calc(100vw * (9 / 16)))",
          }}
        />
      </div>

      {/* Poster sits above the player and fades once frames are arriving —
          the iframe is opaque black while it loads, so underneath it would
          never be seen. */}
      {poster && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            state.playing && state.current > 0.15 ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* click anywhere on the frame to play/pause */}
      <button
        type="button"
        onClick={toggle}
        aria-label={state.playing ? "Pause" : "Play"}
        className="absolute inset-0 cursor-default"
      />

      {/* Scrim. This reel opens on a near-white title card, so the HUD needs
          real protection at both edges or the type disappears into it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.34) 14%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {state.error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">
            signal lost — {state.error}
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <CommandBar
          state={state}
          onToggle={toggle}
          onSeek={seek}
          onMute={setMuted}
        />
      </div>
    </div>
  );
}

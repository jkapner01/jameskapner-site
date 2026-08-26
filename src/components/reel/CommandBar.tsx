"use client";

import { useRef } from "react";
import type { PlayerState } from "./useVimeo";
import { timecode, clock } from "@/lib/timecode";

/**
 * The command bar. Reads as instrumentation rather than a media player:
 * monospace, tabular figures, hard edges, everything labelled.
 */
export function CommandBar({
  state,
  onToggle,
  onSeek,
  onMute,
}: {
  state: PlayerState;
  onToggle: () => void;
  onSeek: (seconds: number) => void;
  onMute: (muted: boolean) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const pct = state.duration ? (state.current / state.duration) * 100 : 0;
  const buffPct = state.duration ? (state.buffered / state.duration) * 100 : 0;

  const scrubTo = (clientX: number) => {
    const el = trackRef.current;
    if (!el || !state.duration) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onSeek(ratio * state.duration);
  };

  return (
    <div className="pointer-events-auto select-none border-t border-line bg-black/55 backdrop-blur-md">
      {/* Scrub track — full bleed, sits on the bar's top edge */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Scrub"
        aria-valuemin={0}
        aria-valuemax={Math.round(state.duration)}
        aria-valuenow={Math.round(state.current)}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          scrubTo(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) scrubTo(e.clientX);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") onSeek(state.current - 5);
          if (e.key === "ArrowRight") onSeek(state.current + 5);
        }}
        className="group relative h-6 cursor-col-resize"
      >
        {/* tick marks — every 10% */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-[1px]">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className={`w-px bg-white/25 ${i % 5 === 0 ? "h-2" : "h-1"}`}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-[11px] h-px bg-white/15" />
        <div
          className="absolute top-[11px] h-px bg-white/30"
          style={{ left: 0, width: `${buffPct}%` }}
        />
        <div
          className="absolute top-[11px] h-px bg-signal"
          style={{ left: 0, width: `${pct}%` }}
        />
        {/* playhead */}
        <div
          className="absolute top-[6px] h-[11px] w-[2px] bg-signal transition-none"
          style={{ left: `calc(${pct}% - 1px)` }}
        />
      </div>

      {/* Readouts + transport */}
      <div className="flex items-center gap-5 px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase sm:gap-8 sm:px-6">
        {/* status */}
        <span className="flex shrink-0 items-center gap-2 text-dim">
          <span
            className={`h-[6px] w-[6px] ${
              state.playing ? "animate-pulse bg-signal" : "bg-white/35"
            }`}
          />
          {state.error ? "offline" : state.playing ? "playing" : "standby"}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-label={state.playing ? "Pause" : "Play"}
          className="shrink-0 border border-line px-3 py-1.5 text-white transition-colors hover:border-signal hover:text-signal"
        >
          {state.playing ? "■ pause" : "▶ play"}
        </button>

        <button
          type="button"
          onClick={() => onMute(!state.muted)}
          aria-label={state.muted ? "Unmute" : "Mute"}
          className={`shrink-0 border px-3 py-1.5 transition-colors ${
            state.muted
              ? "border-line text-dim hover:border-signal hover:text-signal"
              : "border-signal text-signal"
          }`}
        >
          {state.muted ? "muted" : "sound"}
        </button>

        {/* slug — the thing being played */}
        <span className="hidden min-w-0 flex-1 truncate text-dim md:block">
          reel
        </span>

        <span className="ml-auto shrink-0 tabular-nums text-white md:ml-0">
          {timecode(state.current)}
        </span>
        <span className="hidden shrink-0 tabular-nums text-dim sm:inline">
          {clock(state.duration)}
        </span>

        {/* keyboard legend */}
        <span className="hidden shrink-0 gap-3 text-white/25 lg:flex">
          <Key k="space" /> <Key k="m" /> <Key k="← →" />
        </span>
      </div>
    </div>
  );
}

function Key({ k }: { k: string }) {
  return <span className="border border-line px-1.5 py-0.5">{k}</span>;
}

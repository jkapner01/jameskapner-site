"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Player from "@vimeo/player";
import { parseVideo } from "@/lib/video";

export type PlayerState = {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  current: number;
  duration: number;
  buffered: number;
  error: string | null;
};

/**
 * Wraps the Vimeo Player SDK so the UI can drive it directly.
 * We hide Vimeo's own chrome and drive transport ourselves — that's the
 * whole point of the command bar.
 */
export function useVimeo(url: string) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  const [state, setState] = useState<PlayerState>({
    ready: false,
    playing: false,
    muted: true,
    current: 0,
    duration: 0,
    buffered: 0,
    error: null,
  });

  useEffect(() => {
    const host = hostRef.current;
    const v = parseVideo(url);
    if (!host || !v || v.kind !== "vimeo") {
      setState((s) => ({ ...s, error: v ? null : "no video" }));
      return;
    }

    // Pass the full URL, not id + hash. For unlisted videos the SDK needs
    // the privacy hash as part of the url — an id alone gets a 403 and the
    // player hangs on its spinner forever.
    const player = new Player(host, {
      url,
      // Autoplay only survives if muted. Sound is opt-in via the bar.
      autoplay: true,
      muted: true,
      loop: true,
      controls: false,
      playsinline: true,
      dnt: true,
      responsive: false,
    } as ConstructorParameters<typeof Player>[1]);

    playerRef.current = player;

    const onTime = (d: { seconds: number; duration: number }) =>
      setState((s) => ({ ...s, current: d.seconds, duration: d.duration }));
    const onProgress = (d: { seconds: number }) =>
      setState((s) => ({ ...s, buffered: d.seconds }));
    const onPlay = () => setState((s) => ({ ...s, playing: true }));
    const onPause = () => setState((s) => ({ ...s, playing: false }));

    player.on("timeupdate", onTime);
    player.on("progress", onProgress);
    player.on("play", onPlay);
    player.on("pause", onPause);

    player
      .ready()
      .then(async () => {
        const duration = await player.getDuration().catch(() => 0);
        const muted = await player.getMuted().catch(() => true);
        setState((s) => ({ ...s, ready: true, duration, muted }));
      })
      .catch((e: Error) =>
        setState((s) => ({ ...s, error: e?.message || "player failed" })),
      );

    return () => {
      player.off("timeupdate");
      player.off("progress");
      player.off("play");
      player.off("pause");
      player.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, [url]);

  const toggle = useCallback(async () => {
    const p = playerRef.current;
    if (!p) return;
    const playing = await p.getPaused().then((x) => !x).catch(() => false);
    if (playing) await p.pause().catch(() => {});
    else await p.play().catch(() => {});
  }, []);

  const setMuted = useCallback(async (muted: boolean) => {
    const p = playerRef.current;
    if (!p) return;
    await p.setMuted(muted).catch(() => {});
    if (!muted) await p.setVolume(1).catch(() => {});
    setState((s) => ({ ...s, muted }));
  }, []);

  const seek = useCallback(async (seconds: number) => {
    const p = playerRef.current;
    if (!p) return;
    await p.setCurrentTime(Math.max(0, seconds)).catch(() => {});
    setState((s) => ({ ...s, current: Math.max(0, seconds) }));
  }, []);

  const nudge = useCallback(
    (delta: number) => {
      setState((s) => {
        void seek(Math.min(s.duration || Infinity, Math.max(0, s.current + delta)));
        return s;
      });
    },
    [seek],
  );

  return { hostRef, state, toggle, setMuted, seek, nudge };
}

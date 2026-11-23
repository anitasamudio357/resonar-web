import { notFound } from "next/navigation";
import { TRACKS } from "@/data/catalog";
import { PlayerClient } from "@/components/player-client";

export function generateStaticParams() {
  return TRACKS.map((track) => ({ id: track.id }));
}

export default async function CancionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = TRACKS.find((t) => t.id === id);

  if (!track) {
    notFound();
  }

  const playlistTracks = TRACKS.filter((t) => t.moodId === track.moodId);

  return <PlayerClient track={track} playlistTracks={playlistTracks} />;
}

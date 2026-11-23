import { notFound } from "next/navigation";
import { MOODS, TRACKS, MoodId } from "@/data/catalog";
import { PlaylistClient } from "@/components/playlist-client";

export function generateStaticParams() {
  return MOODS.map((mood) => ({ mood: mood.id }));
}

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ mood: string }>;
}) {
  const { mood: moodSlug } = await params;
  const mood = MOODS.find((m) => m.id === (moodSlug as MoodId));

  if (!mood) {
    notFound();
  }

  const tracks = TRACKS.filter((t) => t.moodId === mood.id);

  return <PlaylistClient mood={mood} tracks={tracks} />;
}

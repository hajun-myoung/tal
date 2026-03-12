import { artists } from "@/lib/data";
import { ArtistCard } from "@/components/artist-card";

export default function ArtistsPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">예술가</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((item) => (
          <ArtistCard key={item.id} artist={item} />
        ))}
      </div>
    </div>
  );
}

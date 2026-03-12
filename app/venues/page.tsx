import { venues } from "@/lib/data";
import { VenueCard } from "@/components/venue-card";

export default function VenuesPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">공연장</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((item) => (
          <VenueCard key={item.id} venue={item} />
        ))}
      </div>
    </div>
  );
}

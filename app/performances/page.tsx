import { performances } from "@/lib/data";
import { PerformanceCard } from "@/components/performance-card";

export default function PerformancesPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">공연</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {performances.map((item) => (
          <PerformanceCard key={item.id} performance={item} />
        ))}
      </div>
    </div>
  );
}

import { EstateCard } from "@/components/estate-card";

export function EstateList() {
  return (
    <div className="container space-y-5 divide-y p-3 overflow-auto ">
      <EstateCard />
      <EstateCard />
    </div>
  );
}

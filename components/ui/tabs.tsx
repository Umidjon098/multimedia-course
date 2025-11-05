import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}

export function Tabs({ defaultValue, className, children }: TabsProps) {
  return (
    <div className={cn("w-full", className)} data-default-value={defaultValue}>
      {children}
    </div>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
      data-value={value}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return <div data-value={value}>{children}</div>;
}

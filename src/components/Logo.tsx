import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-baseline ${className}`} aria-label="Shubhanjali home">
      <span className="font-heading text-2xl font-bold lowercase tracking-tight text-primary">
        shubh
      </span>
      <span className="font-heading text-2xl font-bold lowercase tracking-tight text-teal">
        anjali
      </span>
      <span className="ml-0.5 text-[10px] align-top text-muted-foreground">®</span>
    </Link>
  );
}
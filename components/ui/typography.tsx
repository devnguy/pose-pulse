import * as React from "react";
import { cn } from "@/lib/utils";

function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-2xl font-medium tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  );
}
function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
}
function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function SectionHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-semibold text-lg", className)} {...props} />;
}
function ExtraSmall({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-xs leading-none font-medium", className)}
      {...props}
    />
  );
}

function SectionSubHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-medium", className)} {...props} />;
}

export { H1, H2, H3, H4, SectionHeading, SectionSubHeading, ExtraSmall };

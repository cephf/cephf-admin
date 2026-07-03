import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={cn("container px-4 lg:px-16 w-full max-w-full 2xl:max-w-[1800px] mx-auto", className)} id={id}>
      {children}
    </div>
  );
};

export default Container;

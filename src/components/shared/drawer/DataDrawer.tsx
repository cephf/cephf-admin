"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export function AppDrawer({
  open,
  onOpenChange,
  title,
  children,
}: AppDrawerProps) {
  return (
    <Drawer open={open} direction="right" onOpenChange={onOpenChange}>
      <DrawerContent className="px-6 pb-6">
        <div className="mx-auto w-full max-w-lg">
          {title && (
            <DrawerHeader className="px-0">
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
          )}

          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
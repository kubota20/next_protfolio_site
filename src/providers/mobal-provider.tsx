"use client";

import { useState, useEffect } from "react";
import { MobilModal } from "@/components/modals/mobil-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <MobilModal />;
};

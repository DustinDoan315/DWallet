import React, { createContext, useState, useContext, ReactNode } from "react";
import BottomSheet from "@components/BottomSheet";

interface BottomSheetContextProps {
  showBottomSheet: (content: ReactNode) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(
  undefined
);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode>(null);

  const showBottomSheet = (newContent: ReactNode) => {
    setContent(newContent);
  };

  const hideBottomSheet = () => {
    setContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      {/* Global Bottom Sheet Overlay */}
      <BottomSheet setShowBottomSheet={hideBottomSheet}>{content}</BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context)
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  return context;
};

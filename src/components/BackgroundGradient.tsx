import { ReactNode } from "react";

interface BackgroundGradientProps {
  children: ReactNode;
  classes?: string;
}

function BackgroundGradient({ children, classes }: BackgroundGradientProps) {
  const addedClasses = classes ? ` ${classes}` : "";
  return <div className={"" + addedClasses}>{children}</div>;
}
export default BackgroundGradient;

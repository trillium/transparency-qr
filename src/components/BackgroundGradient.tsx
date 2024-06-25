import { ReactNode } from 'react';

interface BackgroundGradientProps {
  children: ReactNode;
  classes?: string;
}

function BackgroundGradient({children, classes}: BackgroundGradientProps) {
const addedClasses = classes ? ` ${classes}` : ""
return (
  <div className={"gradient-bg font-mono flex items-center flex-col min-h-screen relative overflow-hidden" + addedClasses} >
    {children}
  </div>
)
}
export default BackgroundGradient;

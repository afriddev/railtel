"use client";

function AppSpinner() {
  return (
    <div className="fixed inset-0 w-[100vw] h-screen bg-foreground/50  flex items-center justify-center z-[999]">
      
      <div className="loader"></div>
    </div>
  );
}

export default AppSpinner;

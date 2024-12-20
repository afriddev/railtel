"use client";

function AppSpinner() {
  return (
    <div className="fixed inset-0 w-full rounded-md h-full bg-foreground/80  flex items-center justify-center z-[998]">
      
      <div className="loader"></div>
    </div>
  );
}

export default AppSpinner;
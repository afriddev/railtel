"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
      <ProtectedRoute />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./features/Home";
import ProtectedRoute from "@/utils/ProtectedRoute";

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
      <ProtectedRoute />
      </div>
    </QueryClientProvider>
  );
}

export default App;

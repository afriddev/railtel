"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./features/Home";

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home/>
    </QueryClientProvider>
  );
}

export default App;

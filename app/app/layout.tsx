import { DrawingSessionContextProvider } from "@/components/drawing-session/context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DrawingSessionContextProvider>
      <div className="px-4 md:px-16 pb-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          {children}
        </div>
      </div>
    </DrawingSessionContextProvider>
  );
}

import { DrawingSessionContextProvider } from "@/components/drawing-session/context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DrawingSessionContextProvider>{children}</DrawingSessionContextProvider>
  );
}

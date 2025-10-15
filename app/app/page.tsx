import { StandardSessionForm } from "@/components/session-config";

export default function Page() {
  return (
    <div className="px-4 md:px-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <StandardSessionForm />
      </div>
    </div>
  );
}

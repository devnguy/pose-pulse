import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Pause,
  Play,
  Square,
} from "lucide-react";

type ControllerProps = {
  isPaused: boolean;
  onForward: () => void;
  onBack: () => void;
  onTogglePause: () => void;
  onStop: () => void;
};

export function Controller(props: ControllerProps) {
  const { isPaused, onForward, onBack, onTogglePause, onStop } = props;

  return (
    <div className="flex space-x-4">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <Button variant="outline" onClick={onTogglePause}>
        {isPaused ? <Play /> : <Pause />}
      </Button>
      <Button variant="outline" onClick={onStop}>
        <Square />
      </Button>
      <Button variant="outline" onClick={onForward}>
        <ChevronRight />
      </Button>
      <Button variant="outline">
        <ChevronsRight />
      </Button>
    </div>
  );
}

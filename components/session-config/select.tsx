import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageSourceType, SessionType } from ".";
import { ClassPreset } from "./class-mode-form";

// TODO: Map these values eventually
export function CountSelect({ ...props }: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function IntervalSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="30">30 sec</SelectItem>
        <SelectItem value="60">1 min</SelectItem>
        <SelectItem value="90">1.5 min</SelectItem>
        <SelectItem value="120">2 min</SelectItem>
        <SelectItem value="180">3 min</SelectItem>
        <SelectItem value="300">5 min</SelectItem>
        <SelectItem value="600">10 min</SelectItem>
        <SelectItem value="1200">20 min</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SessionTypeSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value={SessionType.STANDARD}>Standard</SelectItem>
        <SelectItem value={SessionType.CLASS}>Class</SelectItem>
        <SelectItem value={SessionType.CUSTOM}>Custom</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ImageSourceSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value={ImageSourceType.PINTEREST}>Pinterest</SelectItem>
        <SelectItem value={ImageSourceType.LOCAL}>Local</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ClassPresetSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value={ClassPreset.THIRTY_MIN}>30 min</SelectItem>
        <SelectItem value={ClassPreset.ONE_HOUR}>1 hour</SelectItem>
        <SelectItem value={ClassPreset.NINETY_MIN}>1.5 hours</SelectItem>
        <SelectItem value={ClassPreset.TWO_HOURS}>2 hours</SelectItem>
        <SelectItem value={ClassPreset.THREE_HOURS}>3 hours</SelectItem>
      </SelectContent>
    </Select>
  );
}

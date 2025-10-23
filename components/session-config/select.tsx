import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CountSelect({ ...props }: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
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

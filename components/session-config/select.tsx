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
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="60">60</SelectItem>
      </SelectContent>
    </Select>
  );
}

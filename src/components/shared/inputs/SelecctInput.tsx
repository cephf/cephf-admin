
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
}

export function SelectInput({
  value,
  onChange,
  placeholder = "Select option",
  options,
}: SelectInputProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white rounded-[32px] border border-[#E2E2E2]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
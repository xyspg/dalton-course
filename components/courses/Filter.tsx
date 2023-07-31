import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface GradesFilterProps {
  onSelectChange: (value: string) => void;
  grades: string[];
}

interface CommonFilterProps {
  onSelectChange: (value: string) => void;
  categories: string[];
  onSelectOpen?: () => void;
  name: string;
}

interface CategoryFilterProps {
  onSelectChange: (value: string) => void;
  categories: string[];
  onSelectOpen?: () => void;
}

export const GradesFilter: React.FC<GradesFilterProps> = ({
  onSelectChange,
  grades,
}) => {
  return (
    <Select defaultValue="All" onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Grades" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Grades</SelectItem>
        {grades.map((grade) => (
          <SelectItem value={grade} key={grade}>
            {grade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onSelectChange,
  categories,
  onSelectOpen,
}) => {
  function Capitalize(str: string) {
    return str.length > 3
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : str.toUpperCase();
  }

  return (
    <>
      <Select
        onValueChange={onSelectChange}
        onOpenChange={onSelectOpen}
        defaultValue="All"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Category</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category} key={category} className="capitalize">
              {Capitalize(category)}{" "}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export const CommonFilter: React.FC<CommonFilterProps> = ({
  onSelectChange,
  categories,
  onSelectOpen,
  name,
}) => {
  return (
    <>
      <Select
        onValueChange={onSelectChange}
        onOpenChange={onSelectOpen}
        defaultValue="All"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue className="capitalize" placeholder={`All ${name}`} />
        </SelectTrigger>
        <SelectContent className="max-h-96 md:max-h-[500px] overflow-y-auto">
          <SelectItem value="All">All {name}</SelectItem>
          {categories.map((item) => (
            <SelectItem value={item} key={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

interface CheckBoxFilterProps {
  text?: string;
  onCheckChange: (value: boolean) => void;
  className?: string;
  defaultChecked?: boolean;
  checked: boolean;
}

export const CheckBoxFilter: React.FC<CheckBoxFilterProps> = ({
  text,
  onCheckChange,
  className,
  defaultChecked,
    checked
}) => {
  return (
    <>
      <div className={cn("flex items-center space-x-2", className)}>
        <Checkbox
          id={text}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckChange}
        />
        <label
          htmlFor={text}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
    </>
  );
};

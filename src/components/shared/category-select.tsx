"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";

const CREATE_VALUE = "__create__";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CategorySelect({
  value,
  onChange,
  placeholder,
  className,
}: CategorySelectProps) {
  const t = useTranslations("categories.select");
  const tCommon = useTranslations("common");
  const utils = trpc.useUtils();
  const { data: categories = [] } = trpc.category.getAll.useQuery();
  const addCategory = trpc.category.add.useMutation();

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const handleSelect = (val: string) => {
    if (val === CREATE_VALUE) {
      setCreating(true);
      return;
    }
    onChange(val);
  };

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const created = await addCategory.mutateAsync({ name: trimmed });
    await utils.category.getAll.invalidate();
    if (created?.id) onChange(created.id);
    setName("");
    setCreating(false);
  };

  const handleCancel = () => {
    setName("");
    setCreating(false);
  };

  if (creating) {
    return (
      <div className={`flex gap-2 ${className ?? ""}`}>
        <Input
          autoFocus
          placeholder={t("newName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCreate();
            }
            if (e.key === "Escape") handleCancel();
          }}
        />
        <Button
          type="button"
          onClick={handleCreate}
          disabled={addCategory.isPending || !name.trim()}
        >
          {addCategory.isPending ? <Spinner /> : tCommon("add")}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          {tCommon("cancel")}
        </Button>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={handleSelect}>
      <SelectTrigger className={className ?? "w-full"}>
        <SelectValue placeholder={placeholder ?? t("placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
        {categories.length > 0 && <SelectSeparator />}
        <SelectItem value={CREATE_VALUE}>{t("createNew")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

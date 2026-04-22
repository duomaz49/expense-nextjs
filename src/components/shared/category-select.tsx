"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";

interface Category {
  id: string;
  name: string;
}

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

  const selected = categories.find((c) => c.id === value) ?? null;

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
    <Combobox<Category>
      items={categories}
      value={selected}
      onValueChange={(item) => onChange(item?.id ?? "")}
      itemToStringLabel={(c) => c.name}
      isItemEqualToValue={(a, b) => a.id === b.id}
    >
      <ComboboxInput
        placeholder={placeholder ?? t("placeholder")}
        className={className ?? "w-full"}
      />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>{t("noMatches")}</ComboboxEmpty>
          <ComboboxCollection>
            {(c: Category) => (
              <ComboboxItem key={c.id} value={c}>
                {c.name}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
        {categories.length > 0 && <ComboboxSeparator />}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setCreating(true);
          }}
          className="relative flex w-full cursor-pointer items-center gap-2 py-2 pr-8 pl-2 text-xs text-primary outline-hidden hover:bg-accent"
        >
          {t("createNew")}
        </button>
      </ComboboxContent>
    </Combobox>
  );
}

"use client";
import { Category } from "@/lib/types/types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                    <span>{category.name}</span>
                    <div className="flex gap-2">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                            onClick={() => alert("Edit")}
                        >
                            <Pencil />
                        </Button>
                        <Button
                            className="cursor-pointer"
                            variant="destructive"
                            size="icon"
                            onClick={() => alert("Delete")}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    );
}

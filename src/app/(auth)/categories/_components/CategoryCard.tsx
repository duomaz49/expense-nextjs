"use client";
import { Category } from "@/lib/types/types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <CardHeader>
                <CardTitle>{category.id}</CardTitle>
                <CardDescription>
                    {category.name}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex w-full justify-end gap-2">
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
            </CardFooter>
        </Card>
    );
}

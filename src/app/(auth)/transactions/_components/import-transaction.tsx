"use client";
import { Input } from "@/components/ui/input";

export default function ImportTransaction() {
    return (
        <form>
            <Input
                accept=".csv"
                type="file"
            />
        </form >
    )
}
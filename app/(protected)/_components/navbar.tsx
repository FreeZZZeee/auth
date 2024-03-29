"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname === "/server" ? "default" : "outline"}
                >
                    <Link href={"/server"}>
                        Профиль
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/client" ? "default" : "outline"}
                >
                    <Link href={"/client"}>
                        Клиент
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/admin" ? "default" : "outline"}
                >
                    <Link href={"/admin"}>
                        Админ
                    </Link>
                </Button>                
                <Button
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href={"/settings"}>
                        Настройки
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    )
}
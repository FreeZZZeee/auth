"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }

                if (data.success) {
                    toast.success(data.success);
                }
            })
    }

    const onApiRouteClik = () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                   toast.success("Разрешенный маршрут API!")                   
                } else {
                    toast.error("Запрещенный маршрут API");                    
                }
            })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                   Панель администратора 
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate
                    allowedRole={UserRole.ADMIN}
                >
                    <FormSuccess 
                        message="Вам разрешено просматривать этот контент!"
                    />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Маршрут API
                    </p>
                    <Button onClick={onApiRouteClik}>
                        Тест
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Настройки сервера 
                    </p>
                    <Button onClick={onServerActionClick}>
                        Тест
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage
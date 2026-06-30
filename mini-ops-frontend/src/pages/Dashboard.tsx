import Navbar from "@/src/components/Navbar.tsx";
import {CreateServiceDialog} from "@/src/components/create-service-dialog.tsx";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Activity,
    Clock3,
    Globe,
    MoreVertical,
    Pencil,
    Search,
    Trash2,
} from "lucide-react";

import useServices from "@/src/hooks/useService.ts";
import {toast} from "sonner";
import {useState} from "react";
import type {ServiceType} from "@/src/types/ServicesType.ts";
import {UpdateServiceDialog} from "@/src/components/update-service-dialog.tsx";

export default function DashboardPage() {
    const [editService, setEditService] = useState<ServiceType | null>(null)
    const {
        isLoading,
        isSubmitting,
        handleUpdateService,
        handleDeleteService,
        handleCreateService,
        services,
    } = useServices();

    if (isLoading) {
        return (
            <main className="min-h-screen bg-zinc-950 text-white">
                <Navbar/>
                <div className="flex h-[70vh] items-center justify-center">
                    <p className="text-zinc-400">Loading services...</p>
                </div>
            </main>
        );
    }
    const onDelete = async (serviceId: string) => {
        try {
            const res = await handleDeleteService(serviceId)
            toast.success(res.message)
        } catch (e) {
            toast.error((e as Error).message)
        }
    }
    const onUpdate = async (serviceId: string, baseUrl: string) => {
        try {
            const res = await handleUpdateService(serviceId, baseUrl)
            toast.success(res.message)
        } catch (e) {
            toast.error((e as Error).message)
        }
    }


    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <Navbar/>

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">Services</h2>

                        <p className="mt-2 text-zinc-400">
                            Search, monitor and manage your API endpoints.
                        </p>
                    </div>

                    <CreateServiceDialog
                        isSubmitting={isSubmitting}
                        handleCreateService={handleCreateService}
                    />
                </div>

                {services.length === 0 ? (
                    <div
                        className="flex h-[50vh] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800">
                        <h3 className="text-xl font-semibold">No services yet</h3>

                        <p className="mt-2 mb-6 text-zinc-400">
                            Create your first service to start monitoring it.
                        </p>

                        <CreateServiceDialog
                            isSubmitting={isSubmitting}
                            handleCreateService={handleCreateService}
                        />
                    </div>
                ) : (
                    <>
                        <div className="relative mb-8">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"/>

                            <Input
                                placeholder="Search services..."
                                className="border-zinc-800 bg-zinc-900 pl-10 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    className="border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <CardTitle className="flex items-center gap-2 text-xl text-zinc-300">
                                                    <Globe className="h-5 w-5 text-blue-400"/>
                                                    My API Service
                                                </CardTitle>

                                                <CardDescription className="break-all text-zinc-400">
                                                    {service.baseUrl}
                                                </CardDescription>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                                    >
                                                        <MoreVertical className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="border-zinc-800 bg-zinc-900 text-white">
                                                    <DropdownMenuItem onSelect={() => setEditService(service)}>
                                                        <Pencil className="mr-2 h-4 w-4"/>
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-red-400 focus:text-red-400"
                                                        onClick={() => onDelete(service.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4"/>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="mb-6 flex items-center justify-between">
                                            <Badge className="bg-emerald-600 hover:bg-emerald-600">
                                                Active
                                            </Badge>

                                            <span className="text-sm text-zinc-500">
                        Created recently
                      </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Card className="border-zinc-800 bg-zinc-950">
                                                <CardContent className="p-4">
                                                    <Activity className="mb-3 h-5 w-5 text-emerald-400"/>

                                                    <p className="text-2xl font-bold">18.2K</p>

                                                    <p className="mt-1 text-xs text-zinc-500">
                                                        Total Requests
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-zinc-800 bg-zinc-950">
                                                <CardContent className="p-4">
                                                    <Clock3 className="mb-3 h-5 w-5 text-sky-400"/>

                                                    <p className="text-2xl font-bold">94 ms</p>

                                                    <p className="mt-1 text-xs text-zinc-500">
                                                        Average Response
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <UpdateServiceDialog
                service={editService}
                open={!!editService}
                onOpenChange={() => setEditService(null)}
                isSubmitting={isSubmitting}
                handleUpdateService={onUpdate}
            />
        </main>
    );
}
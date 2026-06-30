import {DialogTitle, DialogHeader, Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import type {ServiceType} from "@/src/types/ServicesType.ts";
import {useEffect, useState} from "react";

type Props = {
    service: ServiceType | null;
    open: boolean;
    onOpenChange: () => void;
    isSubmitting: boolean;
    handleUpdateService: (
        id: string,
        baseUrl: string
    ) => Promise<void>;
};

export function UpdateServiceDialog({
                                        service,
                                        open,
                                        onOpenChange,
                                        isSubmitting,
                                        handleUpdateService,
                                    }: Props) {
    const [baseUrl, setBaseUrl] = useState(service?.baseUrl ?? "");

    useEffect(() => {
        setBaseUrl(service?.baseUrl ?? "");
    }, [service]);

    const onUpdate = async () => {
        if (!service) return;

        await handleUpdateService(service.id, baseUrl);
        onOpenChange();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                </DialogHeader>

                <Input
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    disabled={isSubmitting}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={onOpenChange}>
                        Cancel
                    </Button>

                    <Button onClick={onUpdate} disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
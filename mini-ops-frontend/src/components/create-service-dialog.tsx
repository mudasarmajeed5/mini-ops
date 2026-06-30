import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import type {CreateServiceResponse} from "@/src/types/ServicesType.ts";
import {toast} from "sonner";

type CreateServiceDialogProps = {
    isSubmitting: boolean;
    handleCreateService: (baseUrl: string) => Promise<CreateServiceResponse>;
};

export const CreateServiceDialog = ({
                                        handleCreateService,
                                        isSubmitting,
                                    }: CreateServiceDialogProps) => {
    const [open, setOpen] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");
    const onCreate = async () => {
        try {
            const res = await handleCreateService(baseUrl);

            toast.success(res.message);

            setBaseUrl("");
            setOpen(false);
        } catch (e) {
            toast.error((e as Error).message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Service</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Service</DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="https://example.com"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    disabled={isSubmitting}
                />

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onCreate}
                        disabled={isSubmitting || !baseUrl.trim()}
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
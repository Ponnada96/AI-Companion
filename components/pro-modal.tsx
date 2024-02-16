'use client'

import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";


export const ProModal = () => {
    const proModal = useProModal();
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onSubscribe = async () => {
        try {
            setLoading(true);
            console.log('clicked')
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url;
        }
        catch (error) {
            toast({
                variant: 'destructive',
                description: "Something went wrong."
            })
        }
        finally {
            setLoading(false)
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        upgrade to pro
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        Create
                        <span className="text-sky-500 font-medium mx-1">Custom AI</span> Companions!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className=" flex justify-between">
                    <p className="text-2xl font-medium">
                        $9
                        <span className="text-sm font-normal">
                            .99/m
                        </span>
                    </p>
                    <Button
                        disabled={loading}
                        onClick={onSubscribe}
                        variant={"premiun"}>
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDialogButtonProps {
  /** Label for the trigger button */
  buttonLabel: string;
  /** Title text for the dialog */
  dialogTitle: string;
  /** Extra content to display inside the dialog (text, JSX, etc.) */
  extraContent?: ReactNode;
  /** Called when the user confirms */
  onConfirm?: () => void;
  /** Called when the user cancels */
  onCancel?: () => void;
  /** Optional button variant (matches shadcn/ui) */
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
}

export default function ConfirmDialogButton({
  buttonLabel,
  dialogTitle,
  extraContent,
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmDialogButtonProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        {buttonLabel}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="py-2 text-sm text-gray-600">{extraContent}</div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

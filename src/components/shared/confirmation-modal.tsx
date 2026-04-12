import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  cancelText?: string;
  continueText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  cancelText,
  continueText,
  onCancel,
  onConfirm,
}: ModalProps) {
  const defaultTitle = "Are you absolutely sure?";
  const defaultDescription =
    "This action cannot be undone. This will permanently delete your account and remove your data from our servers.";
  const defaultCancel = "Cancel";
  const defaultContinue = "Continue";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ? title : defaultTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ? description : defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText ? cancelText : defaultCancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {continueText ? continueText : defaultContinue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

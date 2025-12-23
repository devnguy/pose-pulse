import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, useState } from "react";
import { BoardGroup } from "../image-group";
import { BoardGroupSkeleton } from "../ui/skeleton";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { SessionConfigFormSchema } from ".";
import { useFormContext } from "react-hook-form";
import { SquarePen } from "lucide-react";

type ChooseBoardDialogProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
};

/**
 * This component must keep track of 2 separate board states:
 * 1. The selectedBoard form value
 * 2. The board input
 * The board input will change with UI interaction, and will replace the
 * selectedBoard form value when the user clicks "done" in the dialog. After
 * making changes, if the user clicks cancel, or closes the dialog, their
 * changes will be discarded.
 * Because this isn't rendered using FormField.render, we manually set the
 * form field value and manually clear the error
 */
export function ChooseBoardDialog(props: ChooseBoardDialogProps) {
  const { boardsPromise } = props;
  const { setValue, clearErrors } = useFormContext<SessionConfigFormSchema>();

  const [selectedBoard, setSelectedBoard] = useState<BoardItem>();
  const [selectedBoardInput, setSelectedBoardInput] = useState<BoardItem>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setSelectedBoardInput(selectedBoard);
  };

  const handleOpenChange = (newIsOpenState: boolean) => {
    setIsOpen(newIsOpenState);
    if (newIsOpenState === false) {
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {selectedBoard ? (
          <Button variant="ghost">
            {`${selectedBoard.name} (${selectedBoard.pin_count} pins)`}
            <SquarePen />
          </Button>
        ) : (
          <Button variant="outline">Choose Board</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Board</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ScrollArea className="h-[420px]">
          <Suspense fallback={<BoardGroupSkeleton />}>
            <BoardGroup
              boardsPromise={boardsPromise}
              defaultValue={selectedBoard}
              value={selectedBoardInput}
              onValueChangeAction={(board: BoardItem) => {
                console.log("onchangeaction", board);
                setSelectedBoardInput(board);
              }}
            />
          </Suspense>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              // Commit the input to the form
              setIsOpen(false);
              if (selectedBoardInput) {
                clearErrors("boardId");
                setSelectedBoard(selectedBoardInput);
                setValue("boardId", selectedBoardInput.id);
              }
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

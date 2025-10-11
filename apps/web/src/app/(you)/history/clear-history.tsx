"use client";

import { getIdQuery } from "@/app/(utils)/utils";
import { clientHttp } from "@/lib/queries/http.service";
import { AlertDialog, Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";

export function ClearHistoryButton({
  id,
  type,
}: {
  id: string;
  type: "user" | "guest";
}) {
  const { mutate } = useMutation({
    mutationFn: async () =>
      await clientHttp.delete(
        `/item-views?type=${type}&${getIdQuery(id, type)}`,
      ),
    onError: (error) => {
      console.error("Error deleting item views:", error);
    },
  });

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="soft" className="alert-dialog-button">
          Clear History
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        className="alert-dialog-content"
        style={{ maxWidth: "450px" }}
      >
        <AlertDialog.Title>Clear History</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? Your browsing history will be cleared, and you won't be
          able to restore it.
        </AlertDialog.Description>

        <AlertDialog.Cancel>
          <Button variant="soft" color="gray" className="alert-dialog-button">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button
            variant="solid"
            onClick={() => mutate()}
            className="alert-dialog-button"
            color="red"
          >
            Clear History
          </Button>
        </AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

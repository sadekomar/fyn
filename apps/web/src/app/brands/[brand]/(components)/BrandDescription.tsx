"use client";

import { Dialog } from "@radix-ui/themes";
import { ReadBrandResponse } from "../(utils)/brand";

export function BrandDescription({
  brandData,
}: {
  brandData: ReadBrandResponse;
}) {
  return (
    <div className="BrandContainer__Description">
      {brandData.description && brandData.description.length >= 110 ? (
        <div>
          {brandData.description?.slice(0, 110)}
          <Dialog.Root>
            <Dialog.Trigger>
              <span className="description-trigger">...MORE</span>
            </Dialog.Trigger>
            <Dialog.Content>{brandData.description}</Dialog.Content>
          </Dialog.Root>
        </div>
      ) : (
        <p>{brandData.description}</p>
      )}
    </div>
  );
}

"use client";

import { Dialog } from "@radix-ui/themes";
import { descriptionsAndLogos } from "@/data/descriptionsAndLogos";

export function BrandDescription({ brand }) {
  return (
    <div className="BrandContainer__Description">
      {descriptionsAndLogos[brand]?.description.length >= 110 ? (
        <div>
          {descriptionsAndLogos[brand]?.description.slice(0, 110)}
          <Dialog.Root>
            <Dialog.Trigger>
              <span className="description-trigger">...MORE</span>
            </Dialog.Trigger>
            <Dialog.Content>
              {descriptionsAndLogos[brand]?.description}
            </Dialog.Content>
          </Dialog.Root>
        </div>
      ) : (
        <p>{descriptionsAndLogos[brand]?.description}</p>
      )}
    </div>
  );
}

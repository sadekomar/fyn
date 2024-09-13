"use client"
import { Dialog } from "@radix-ui/themes";

import { descriptionsAndLogos } from "@/data/descriptionsAndLogos";

export function BrandDescription({ brand }) {
    return <p className="BrandContainer__Description">
        {(descriptionsAndLogos[brand]?.description.length >= 110) ?
            <p>
                {descriptionsAndLogos[brand]?.description.slice(0, 110)}
                <Dialog.Root>
                    <Dialog.Trigger>
                        <span className="description-trigger">...MORE</span>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        {descriptionsAndLogos[brand]?.description}
                    </Dialog.Content>
                </Dialog.Root>

            </p> :
            <p>{descriptionsAndLogos[brand]?.description}</p>}
    </p>;
}
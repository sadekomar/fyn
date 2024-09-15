import { ItemCardPlaceholder } from "@/components/ItemCard/ItemCardPlaceholder";
import './GridLayout.css'


export function GridPlaceholder() {
    return <>
        <div className="wrapper">
            <div className="grid">
                {[...Array(50)].map((_, index) => (
                    <ItemCardPlaceholder key={index} />
                )
                )}
            </div>
        </div>
    </>;
}

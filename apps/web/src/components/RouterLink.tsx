import { Link as RadixThemesLink } from "@radix-ui/themes";
import { Link as RouterDOMLink } from "react-router-dom";

export function Link({ href, children, className }) {
  return (
    <RadixThemesLink className={className} asChild>
      <RouterDOMLink to={href}>{children}</RouterDOMLink>
    </RadixThemesLink>
  );
}

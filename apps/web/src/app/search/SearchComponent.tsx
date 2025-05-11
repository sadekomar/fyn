import { useEffect, useState } from "react";
import { useDebounce } from "./hooks";

export function ControlledSearchComponent() {
  const [searchField, setSearchField] = useState<string>("");

  const debouncedSearch = useDebounce(searchField);

  useEffect(() => {
    console.log(debouncedSearch);
    window.history.pushState(null, "", `/search?query=${debouncedSearch}`);
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />
    </div>
  );
}

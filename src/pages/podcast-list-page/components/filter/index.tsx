import { Dispatch } from "react";
import "./styles.scss";

interface FilterProps {
  filterText: string;
  setFilterText: Dispatch<React.SetStateAction<string>>;
  filteredPodcastsCount: number;
}

export const Filter: React.FC<FilterProps> = ({
  filterText,
  setFilterText,
  filteredPodcastsCount,
}) => {
  return (
    <div className="filter">
      <span className="filter__count">{filteredPodcastsCount}</span>

      <input
        type="text"
        placeholder="Filter podcasts..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="filter__input"
      />
    </div>
  );
};

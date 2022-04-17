import React from "react";

type SearchBarProps = {
  searchText: string;
  onFilter: (searchText: string) => void;
}

export const SearchBar = ({ searchText, onFilter }: SearchBarProps) => {
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    onFilter(e.currentTarget.value);
  };

  const handleClear = () => {
    onFilter("");
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <form>
          <div className="input-field grey lighten-4">
            <input
              id="search"
              type="search"
              value={searchText}
              onChange={handleSearch}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="clear-icon material-icons" onClick={handleClear}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

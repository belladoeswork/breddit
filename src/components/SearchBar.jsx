"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (newValue) => {
    setQuery(newValue);
  };

//   

  return (
    <div className="navbar">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "10px" }} />
        <input
          className="search-bar"
          type="text"
          placeholder="Search Reddit"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
    </div>
  );
}

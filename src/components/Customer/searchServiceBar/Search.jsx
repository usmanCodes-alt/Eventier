// TODO: Search service by category only, no string input.

import React, { useState } from "react";
import Select from "react-select";

export default function Search() {
  const OPTIONS = [
    { value: null, label: "All" },
    { value: "Catering", label: "Catering" },
    { value: "Hall Providers", label: "Hall Providers" },
    { value: "Rent a Car", label: "Rent a Car" },
    { value: "Decoration", label: "Decoration" },
    { value: "Foods", label: "Foods" },
  ];

  const selectCustomStyles = {
    options: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
    }),

    control: () => ({
      width: "50%",
      margin: "auto",
      display: "flex",
      "margin-bottom": 20,
      "margin-top": 20,
      border: "1px solid grey",
      "border-radius": 5,
      padding: 10,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="search__wrapper">
      <h6>Service Type</h6>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={OPTIONS}
        styles={selectCustomStyles}
        placeholder="Search Services by type"
      />
    </div>
  );
}

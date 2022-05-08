import React, { useState } from "react";
import Select from "react-select";

export default function Search({ showSelectedServicesOnHome }) {
  const OPTIONS = [
    { value: null, label: "All" },
    { value: "Catering", label: "Catering" },
    { value: "Hall", label: "Hall Providers" },
    { value: "Rent a Car", label: "Rent a Car" },
    { value: "Decoration", label: "Decoration" },
    { value: "Foods", label: "Foods" },
    { value: "Clothing", label: "Clothes" },
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

    menu: (provided, state) => ({
      ...provided,
      width: "50%",
      "margin-left": "auto",
      display: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, 8%)",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const [selectedOption, setSelectedOption] = useState("");

  const onSelection = (value) => {
    console.log(value);
    setSelectedOption(value);
    showSelectedServicesOnHome(value.value);
  };

  return (
    <div className="search__wrapper">
      <Select
        value={selectedOption}
        onChange={onSelection}
        options={OPTIONS}
        styles={selectCustomStyles}
        placeholder="Search Services by type"
        // width="200px"
      />
    </div>
  );
}

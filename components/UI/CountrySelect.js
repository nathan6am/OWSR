import Select from "react-select";
import countries from "@/lib/data/countries";

let options = [];
const customStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "#121212",
    border: "none",
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? "#1f1f1f" : "#121212",
    color: "white",
  }),
  singleValue: (styles, { data }) => ({ ...styles, color: "#FFFFFF" }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "#121212",
  }),
};
for (const [key, value] of Object.entries(countries)) {
  options.push({
    value: key,
    label: value,
  });
}

export default function CountrySelect(props) {
  return (
    <Select
      {...props}
      options={options}
      formatOptionLabel={formatOptionLabel}
      styles={customStyles}
    />
  );
}

const formatOptionLabel = (props) => {
  return (
    <div className="flex flex-row">
      <img
        className="mr-5 ml-1"
        src={`icons/flags/${props.value.toLowerCase()}.svg`}
        width="25px"
        height="auto"
      ></img>
      <div>{props.label}</div>
    </div>
  );
};

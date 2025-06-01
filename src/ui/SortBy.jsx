import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curValue = searchParams.get("sortBy") || "";
  function handleChange(e) {
    const value = e.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={curValue}
      onChange={handleChange}
      type='white'
    />
  );
}

export default SortBy;

import TableOperations from "../../ui/TableOperations";
import Fliter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Fliter
        filterField='discount'
        options={[
          { label: "All", value: "all" },
          { label: "With discount", value: "with-discount" },
          { label: "No discount", value: "no-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By name(A-z)" },
          { value: "name-desc", label: "Sort By name(Z-A)" },
          { value: "regularPrice-asc", label: "Sort By price(asc)" },
          { value: "regularPrice-desc", label: "Sort By price(desc)" },
          { value: "maxCapacity-asc", label: "Sort By maxCapacity(asc)" },
          { value: "maxCapacity-desc", label: "Sort By maxCapacity(desc)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

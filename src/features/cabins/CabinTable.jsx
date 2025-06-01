import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";

  if (isPending) return <Spinner />;

  // 1. Filter cabins based on the selected discount value
  const filteredCabins = cabins?.filter((cabin) => {
    if (filteredValue === "all") return true;
    if (filteredValue === "no-discount" && cabin.discount === 0) return true;
    if (filteredValue === "with-discount" && cabin.discount > 0) return true;
    return false;
  });
  //. Sort cabins based on (name, price, capacity)
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, dircation] = sortBy.split("-");
  const modifier = dircation === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} role='row' />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

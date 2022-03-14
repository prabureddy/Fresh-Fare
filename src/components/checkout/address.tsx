import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';

const AddressPage: React.FC = () => {
  let { data, isLoading, refetch } = useAddressQuery();
  return !isLoading ? (
    <AddressGrid address={data?.data} fetchAdress={refetch} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;

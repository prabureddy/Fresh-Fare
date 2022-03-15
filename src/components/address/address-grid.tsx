import { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/common/modal/modal.context';
import { formatAddress } from '@utils/format-address';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import { useAddressMutation } from '../../framework/basic-rest/address/use-address';

const AddressGrid: React.FC<{ address?: any; fetchAdress?: () => void }> = ({
  address,
  fetchAdress,
}) => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { mutateAsync: login, isLoading } = useAddressMutation();
  address = address || [];

  function handlePopupView(item: any) {
    const newAddress = address.filter((a: any) => a.id !== item.id);
    openModal('ADDRESS_VIEW_AND_EDIT', {
      ...item,
      onSave: (item: any) => {
        newAddress.push(item);
        address = [...newAddress];
        handlerSaveAddress();
      },
    });
  }

  const [selected, setSelected] = useState(address[0]);

  const handlerSaveAddress = () => {
    login({
      address: address.map((a: any) => ({
        ...a,
        default: a.id === selected?.id,
      })),
    }).then((data: any) => {
      const { success } = data;
      success && fetchAdress && fetchAdress();
    });
  };

  return (
    <div className="text-15px h-full flex flex-col justify-between -mt-4 md:mt-0">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="md:grid md:grid-cols-2 md:gap-5 auto-rows-auto space-y-4 md:space-y-0"
      >
        <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
        {address?.length > 0 ? (
          address?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              className={({ checked }) =>
                `${checked ? 'border-skin-primary' : 'border-skin-base'}
                  border-2 relative shadow-md focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box`
              }
            >
              <RadioGroup.Label
                as="h3"
                className="text-skin-base font-semibold mb-2 -mt-1"
              >
                {item?.title}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="div"
                className="text-skin-muted leading-6"
              >
                {item?.address?.formatted_address}
              </RadioGroup.Description>
              <div className="flex absolute end-3 top-3 z-10 lg:opacity-0 transition-all address__actions">
                <button
                  onClick={() => handlePopupView(item)}
                  className="flex justify-center items-center bg-skin-primary h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                >
                  <span className="sr-only">{t(item?.title)}</span>
                  <TiPencil />
                </button>
              </div>
            </RadioGroup.Option>
          ))
        ) : (
          <div className="border-2 border-skin-base rounded font-semibold p-5 px-10 text-skin-red flex justify-start items-center min-h-[112px] h-full">
            {t('text-no-address-found')}
          </div>
        )}
        <button
          className="w-full border-2 transition-all border-skin-base rounded font-semibold p-5 px-10 cursor-pointer text-skin-primary flex justify-start hover:border-skin-primary items-center min-h-[112px] h-full"
          onClick={handlePopupView}
        >
          <AiOutlinePlus size={18} className="me-2" />
          {t('text-add-address')}
        </button>
      </RadioGroup>

      <div className="flex sm:justify-end mt-5 md:mt-10 lg:mt-20 save-change-button">
        <Button
          onClick={handlerSaveAddress}
          loading={isLoading}
          className="w-full sm:w-auto"
        >
          {t('button-save-changes')}
        </Button>
      </div>
    </div>
  );
};

export default AddressGrid;

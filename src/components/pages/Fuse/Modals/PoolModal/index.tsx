import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";

import AmountSelect from "./AmountSelect";
import { MODAL_PROPS } from "../../../../shared/Modal";

import { USDPricedFuseAsset } from "../../../../../utils/fetchFusePoolData";

interface Props {
  isOpen: boolean;
  onClose: () => any;
  defaultMode: Mode;
  index: number;
  assets: USDPricedFuseAsset[];
  comptrollerAddress: string;
}

export enum Mode {
  SUPPLY,
  WITHDRAW,
  BORROW,
  REPAY,
}

const DepositModal = (props: Props) => {
  const [mode, setMode] = useState(props.defaultMode);

  useEffect(() => {
    setMode(props.defaultMode);
  }, [props.isOpen, props.defaultMode]);

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent {...MODAL_PROPS}>
      <ModalBody borderRadius={16} p={0}>
        <AmountSelect
          comptrollerAddress={props.comptrollerAddress}
          onClose={props.onClose}
          assets={props.assets}
          index={props.index}
          mode={mode}
          setMode={setMode}
        />
      </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;

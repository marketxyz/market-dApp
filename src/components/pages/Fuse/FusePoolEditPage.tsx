import { ReactNode } from "react";
import { Row } from "utils/chakraUtils";
import DashboardBox from "../../shared/DashboardBox";

export enum ComptrollerErrorCodes {
  NO_ERROR,
  UNAUTHORIZED,
  COMPTROLLER_MISMATCH,
  INSUFFICIENT_SHORTFALL,
  INSUFFICIENT_LIQUIDITY,
  INVALID_CLOSE_FACTOR,
  INVALID_COLLATERAL_FACTOR,
  INVALID_LIQUIDATION_INCENTIVE,
  MARKET_NOT_ENTERED, // no longer possible
  MARKET_NOT_LISTED,
  MARKET_ALREADY_LISTED,
  MATH_ERROR,
  NONZERO_BORROW_BALANCE,
  PRICE_ERROR,
  REJECTION,
  SNAPSHOT_ERROR,
  TOO_MANY_ASSETS,
  TOO_MUCH_REPAY,
  SUPPLIER_NOT_WHITELISTED,
  BORROW_BELOW_MIN,
  SUPPLY_ABOVE_MAX,
}

export async function testForComptrollerErrorAndSend(
  txObject: any,
  caller: string,
  failMessage: string
) {
  let response = await txObject.call({ from: caller });

  // For some reason `response` will be `["0"]` if no error but otherwise it will return a string number.
  if (response[0] !== "0") {
    const err = new Error(
      failMessage + " Code: " + ComptrollerErrorCodes[response]
    );

    throw err;
  }

  return txObject.send({ from: caller });
}

export const SaveButton = ({
  onClick,
  altText,
  ...others
}: {
  onClick: () => any;
  altText?: string;
  [key: string]: any;
}) => {
  // const bgColor = useColorModeValue("white", "gray.900")
  // const textColor = useColorModeValue("#2f2f2f", "white")

  return (
    <DashboardBox
      flexShrink={0}
      bg={"black"}
      textColor={"white"}
      ml={2}
      px={2}
      height="35px"
      as="button"
      fontWeight="bold"
      onClick={onClick}
      {...others}
    >
      {altText ?? "Save"}
    </DashboardBox>
  );
};

export const ConfigRow = ({
  children,
  ...others
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  return (
    <Row
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      width="100%"
      my={4}
      px={4}
      overflowX="auto"
      flexShrink={0}
      {...others}
    >
      {children}
    </Row>
  );
};

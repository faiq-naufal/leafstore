import { FaShoppingBag } from "@react-icons/all-files/fa/FaShoppingBag";
import {
  IconButton,
  ButtonGroup,
  useBreakpointValue,
  Badge,
} from "@chakra-ui/react";
import Link from "../Link";

const Icon = ({ totalItems }) => (
  <>
    <FaShoppingBag />
    <Badge ml="2" fontSize={["10px", "11px"]} bgColor="white">
      {totalItems}
    </Badge>
  </>
);

export default function Cart({ totalItems }) {
  return (
    <ButtonGroup>
      <Link href="/cart">
        <IconButton
          size={["sm", "md"]}
          aria-label="Cart"
          variant="none"
          fontSize={["lg", "2xl"]}
          color="white"
        >
          <Icon totalItems={totalItems} />
        </IconButton>
      </Link>
    </ButtonGroup>
  );
}

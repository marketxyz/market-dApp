import { Button } from "@chakra-ui/react";

export const AddPoolButton = ({switchModalVisibility}: any) => {
    return (
        <Button
            onClick={() => switchModalVisibility()}
            bgGradient="linear-gradient(210.72deg, #BB3EF0 -13.86%, #5109B0 105.5%)"
            color="#FFFFFF"
            borderRadius="25px"
            fontWeight="medium"
            marginBottom="10px"
            _hover={{}}
            _active={{}}
        >
            Add Pool
        </Button>
    );
}
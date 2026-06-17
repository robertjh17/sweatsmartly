import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '@/components/navigation/sidebar/Sidebar';
import type { ReactNode, FC } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

const AuthenticatedLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Flex height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Box width="240px" height="100vh" overflow="hidden" flexShrink={0}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box flex="1" height="100vh" overflow="hidden">
        <Box
          height="100%"
          overflowY="auto"
          px={{ base: 4, md: 8 }} 
          py={{ base: 4, md: 6 }} 
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default AuthenticatedLayout;

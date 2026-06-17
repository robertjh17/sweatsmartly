import Link from 'next/link';
import { Flex, Text, Icon } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import type { FC } from 'react';

type SidebarNavItemProps = {
  href: string;
  label: string;
  icon?: IconType;
};

const SidebarNavItem: FC<SidebarNavItemProps> = ({ href, label, icon }) => {
  return (
    <Link href={href}>
      <Flex align="center" gap={3} _hover={{ textDecoration: 'underline' }}>
        {icon && <Icon as={icon} boxSize={5} />}
        <Text>{label}</Text>
      </Flex>
    </Link>
  );
};

export default SidebarNavItem;
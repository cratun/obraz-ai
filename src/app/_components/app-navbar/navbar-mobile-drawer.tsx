'use client';

import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import Link from 'next/link';
import { styles } from '@/app/(main-layout)/inspirations/utils';
import AppLogo from '@/app/_components/app-logo';
import AppSocials from '@/app/_components/app-socials';
import GenerateNavbarButtons from '@/app/_components/generate-navbar-buttons';
import Typography from '@/app/_components/typography';
import { footerLinks } from '@/app/_utils/constants';

const DrawerTreeItem = (props: TreeItem2Props) => (
  <TreeItem2
    {...props}
    classes={{
      content: 'text-base leading-[1.5] tracking-[0.5px] p-0 flex-row-reverse',
      focused: 'bg-transparent',
      selected: 'bg-transparent',
      expanded: 'gap-5',
    }}
  />
);

const NavbarMobileDrawer = ({ isLoading }: { isLoading: boolean }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton className="p-0 lg:hidden" color="primary" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        classes={{ paper: 'w-full max-w-[300px]  p-2.5 gap-2.5' }}
        open={open}
        onClose={handleClose}
      >
        <div className="flex items-center justify-between">
          <AppLogo />
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon className="text-text" />
          </IconButton>
        </div>
        <hr className="text-text/20" />
        <div className="flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden text-text">
          <Link href="/" onClick={handleClose}>
            <Typography.Body>Strona główna</Typography.Body>
          </Link>
          <hr className="text-text/20" />
          <Link href="/generate/portrait" onClick={handleClose}>
            <Typography.Body>Stwórz swój portret</Typography.Body>
          </Link>
          <hr className="text-text/20" />
          {isLoading && (
            <Link href="/generate" onClick={handleClose}>
              <Typography.Body>Stwórz swój obraz</Typography.Body>
            </Link>
          )}
          {!isLoading && <GenerateNavbarButtons.Drawer onClick={handleClose} />}
          <hr className="text-text/20" />
          <SimpleTreeView>
            <DrawerTreeItem itemId="inspirations" label="Inspiracje">
              <DrawerTreeItem
                className="py-1.5"
                itemId="all"
                label="Wszystkie"
                slots={{
                  content: () => (
                    <Link href="/inspirations" onClick={handleClose}>
                      Wszystkie
                    </Link>
                  ),
                }}
              />
              {Object.entries(styles).map(([key, value]) => (
                <DrawerTreeItem
                  key={key}
                  className="py-1.5"
                  itemId={key}
                  label={value}
                  slots={{
                    content: () => (
                      <Link href={`/inspirations/${key}`} onClick={handleClose}>
                        {value}
                      </Link>
                    ),
                  }}
                />
              ))}
            </DrawerTreeItem>
          </SimpleTreeView>
          <hr className="text-text/20" />
          <Link href="/gallery" onClick={handleClose}>
            <Typography.Body>Galeria Twoich obrazów</Typography.Body>
          </Link>
          <hr className="text-text/20" />
          <Link href="/manual" onClick={handleClose}>
            <Typography.Body>Jak generować?</Typography.Body>
          </Link>
          <hr className="text-text/20" />
          <Link href="/giftcard" onClick={handleClose}>
            <Typography.Body>Karta podarunkowa</Typography.Body>
          </Link>
          <hr className="text-text/20" />
          <SimpleTreeView>
            <DrawerTreeItem itemId="inspirations" label="Wsparcie">
              {Object.entries(footerLinks['Wsparcie']).map(([key, value]) => (
                <DrawerTreeItem
                  key={key}
                  className="py-1.5"
                  itemId={value}
                  label={key}
                  slots={{
                    content: () => (
                      <Link href={value} onClick={handleClose}>
                        {key}
                      </Link>
                    ),
                  }}
                />
              ))}
            </DrawerTreeItem>
          </SimpleTreeView>
        </div>
        <AppSocials className="mt-auto flex-row items-center" />
      </Drawer>
    </>
  );
};

export default NavbarMobileDrawer;

"use client";
import { useState } from "react";
import { createStyles, Navbar, getStylesRef, rem, Modal} from "@mantine/core";
import { IconLogout, IconLayout } from "@tabler/icons-react";
import { MdAddCircleOutline, MdEditDocument } from "react-icons/md";
import { FaLayerGroup, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { sidebarOpen } from "../signal/index";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },
  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
  layerSubSection: {
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    margin: theme.spacing.sm,
  },
  borderedItem: {
    borderRadius: '5px',
    border: '1px solid black'
  },
  divider: {
    height: '1px',
    backgroundColor: 'black',
    margin: `${theme.spacing.xs} 0`,
  },
}));

const data = [
  { link: "/dashboard", label: "Map Dashboard", icon: IconLayout },
  { link: "#", label: "Layers", icon: FaLayerGroup, isSubSection: true},
  { link: "/ledger", label: "Ledger", icon: MdEditDocument },
  { link: "/users", label: "Users", icon: FaUserCircle },
  { link: "/documents", label: "Documents", icon: MdEditDocument },
];

export function NavbarSimple() {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const path = usePathname();
  const [active, setActive] = useState(path);
  const [isLayerSectionVisible, setLayerSectionVisibility] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);


  const handleLinkClick = (item) => {
    if (item.isSubSection) {
      setLayerSectionVisibility(!isLayerSectionVisible);
    } else {
      // sidebarOpen.value = false
    }
  };

  const links = data.map((item) => {
    return (
      <div 
        key={item.label} 
        className={cx({
          [classes.borderedItem]: isLayerSectionVisible && item.isSubSection,
        })}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: item.link === active,
            })}
            href={item.link}
            as={item.link}
            onClick={() => handleLinkClick(item)}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} size={23} />
            <span>{item.label}</span>
          </Link>
          {item.isSubSection && 
            <MdAddCircleOutline 
              onClick={open} // Use open function from useDisclosure
              style={{ cursor: "pointer", marginLeft: "10px" }} 
            />}
        </div>
        {isLayerSectionVisible && item.isSubSection && 
          <div className={classes.layerSubSection}>
            <h3>Vector Layer</h3>
            <div className={classes.divider} />
            <h3>Raster Layer</h3>
          </div>
        }
      </div>
    );
  });

  return (
    <div className="w-full transition duration-1000 ease-in-out">
      <Navbar style={{ height: "88vh" }} p="md">
        <Navbar.Section grow>{links}</Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <button
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              localStorage.removeItem("revetment-token");
              localStorage.removeItem("userInfo");
              router.push("/sign-in");
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </button>
        </Navbar.Section>
      </Navbar>
      <Modal
        opened={opened} // Use opened prop from useDisclosure
        onClose={close} // Use close function from useDisclosure
        title="My dialog"
      >
        <h2>My dialog</h2>
        <button onClick={close}>Close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
}
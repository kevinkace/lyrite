"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import { userLinks } from "@/data/consts";

import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Text,
  Separator,
} from "@radix-ui/themes";

import css from "./layout.module.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  if (!user && !authLoading) {
    router.replace("/login");
    return null;
  }

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Flex className={css.container} gap="6" align="stretch">
      {/* Left rail */}
      <Box className={css.rail}>
        <Card size="3" className={css.profileCard}>
          <Flex direction="column" align="center" gap="3">
            <Avatar
              size="7"
              src={user?.user_metadata?.avatar_url}
              fallback={user?.email?.[0]?.toUpperCase() ?? "U"}
              radius="full"
            />
            <Heading size="4">
              {user?.user_metadata?.preferred_username ??
                user?.user_metadata?.full_name ??
                "User"}
            </Heading>
            <Text color="gray" size="2">
              {user?.email}
            </Text>
          </Flex>
        </Card>

        <nav className={css.nav}>
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={css.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Box>

      {/* Full-height separator */}
      <Separator orientation="vertical" className={css.separator} />

      {/* Main content */}
      <Box className={css.content}>{children}</Box>
    </Flex>
  );
}

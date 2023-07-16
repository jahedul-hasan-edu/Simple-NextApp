"use client";
import { signal } from "@preact/signals-react";
const authToken = signal(null);
const sidebarOpen = signal(false);
const userInfo = signal(null);

export { authToken, userInfo, sidebarOpen };

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedRoomListingImport } from './routes/_authenticated/roomListing'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedLayoutImport } from './routes/_authenticated/layout'
import { Route as AuthenticatedEditProfileImport } from './routes/_authenticated/editProfile'
import { Route as AuthenticatedAllUsersImport } from './routes/_authenticated/allUsers'
import { Route as AuthenticatedAboutImport } from './routes/_authenticated/about'
import { Route as AuthenticatedHouseListingImport } from './routes/_authenticated/HouseListing'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedRoomListingRoute = AuthenticatedRoomListingImport.update({
  id: '/roomListing',
  path: '/roomListing',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: '/layout',
  path: '/layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedEditProfileRoute = AuthenticatedEditProfileImport.update({
  id: '/editProfile',
  path: '/editProfile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAllUsersRoute = AuthenticatedAllUsersImport.update({
  id: '/allUsers',
  path: '/allUsers',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAboutRoute = AuthenticatedAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedHouseListingRoute = AuthenticatedHouseListingImport.update({
  id: '/HouseListing',
  path: '/HouseListing',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/HouseListing': {
      id: '/_authenticated/HouseListing'
      path: '/HouseListing'
      fullPath: '/HouseListing'
      preLoaderRoute: typeof AuthenticatedHouseListingImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/about': {
      id: '/_authenticated/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AuthenticatedAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/allUsers': {
      id: '/_authenticated/allUsers'
      path: '/allUsers'
      fullPath: '/allUsers'
      preLoaderRoute: typeof AuthenticatedAllUsersImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/editProfile': {
      id: '/_authenticated/editProfile'
      path: '/editProfile'
      fullPath: '/editProfile'
      preLoaderRoute: typeof AuthenticatedEditProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/layout': {
      id: '/_authenticated/layout'
      path: '/layout'
      fullPath: '/layout'
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/roomListing': {
      id: '/_authenticated/roomListing'
      path: '/roomListing'
      fullPath: '/roomListing'
      preLoaderRoute: typeof AuthenticatedRoomListingImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedHouseListingRoute: typeof AuthenticatedHouseListingRoute
  AuthenticatedAboutRoute: typeof AuthenticatedAboutRoute
  AuthenticatedAllUsersRoute: typeof AuthenticatedAllUsersRoute
  AuthenticatedEditProfileRoute: typeof AuthenticatedEditProfileRoute
  AuthenticatedLayoutRoute: typeof AuthenticatedLayoutRoute
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedRoomListingRoute: typeof AuthenticatedRoomListingRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedHouseListingRoute: AuthenticatedHouseListingRoute,
  AuthenticatedAboutRoute: AuthenticatedAboutRoute,
  AuthenticatedAllUsersRoute: AuthenticatedAllUsersRoute,
  AuthenticatedEditProfileRoute: AuthenticatedEditProfileRoute,
  AuthenticatedLayoutRoute: AuthenticatedLayoutRoute,
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedRoomListingRoute: AuthenticatedRoomListingRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/HouseListing': typeof AuthenticatedHouseListingRoute
  '/about': typeof AuthenticatedAboutRoute
  '/allUsers': typeof AuthenticatedAllUsersRoute
  '/editProfile': typeof AuthenticatedEditProfileRoute
  '/layout': typeof AuthenticatedLayoutRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/roomListing': typeof AuthenticatedRoomListingRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/HouseListing': typeof AuthenticatedHouseListingRoute
  '/about': typeof AuthenticatedAboutRoute
  '/allUsers': typeof AuthenticatedAllUsersRoute
  '/editProfile': typeof AuthenticatedEditProfileRoute
  '/layout': typeof AuthenticatedLayoutRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/roomListing': typeof AuthenticatedRoomListingRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/_authenticated/HouseListing': typeof AuthenticatedHouseListingRoute
  '/_authenticated/about': typeof AuthenticatedAboutRoute
  '/_authenticated/allUsers': typeof AuthenticatedAllUsersRoute
  '/_authenticated/editProfile': typeof AuthenticatedEditProfileRoute
  '/_authenticated/layout': typeof AuthenticatedLayoutRoute
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_authenticated/roomListing': typeof AuthenticatedRoomListingRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/HouseListing'
    | '/about'
    | '/allUsers'
    | '/editProfile'
    | '/layout'
    | '/profile'
    | '/roomListing'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/HouseListing'
    | '/about'
    | '/allUsers'
    | '/editProfile'
    | '/layout'
    | '/profile'
    | '/roomListing'
    | '/'
  id:
    | '__root__'
    | '/_authenticated'
    | '/login'
    | '/_authenticated/HouseListing'
    | '/_authenticated/about'
    | '/_authenticated/allUsers'
    | '/_authenticated/editProfile'
    | '/_authenticated/layout'
    | '/_authenticated/profile'
    | '/_authenticated/roomListing'
    | '/_authenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/HouseListing",
        "/_authenticated/about",
        "/_authenticated/allUsers",
        "/_authenticated/editProfile",
        "/_authenticated/layout",
        "/_authenticated/profile",
        "/_authenticated/roomListing",
        "/_authenticated/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_authenticated/HouseListing": {
      "filePath": "_authenticated/HouseListing.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/about": {
      "filePath": "_authenticated/about.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/allUsers": {
      "filePath": "_authenticated/allUsers.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/editProfile": {
      "filePath": "_authenticated/editProfile.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/layout": {
      "filePath": "_authenticated/layout.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/roomListing": {
      "filePath": "_authenticated/roomListing.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */

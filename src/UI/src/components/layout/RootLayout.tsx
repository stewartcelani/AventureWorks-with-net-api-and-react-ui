import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import LoadingBar from 'react-top-loading-bar';
import { useEffect } from 'react';
import HeaderNav from '@components/layout/HeaderNav.tsx';
import { useUiStore } from '@stores/uiStore.ts';
import { logger } from '@/lib/logger.ts';
import { Input } from '@components/ui/input.tsx';
import { useTheme } from '@providers/ThemeProvider.tsx';
import { Toaster } from '@/components/ui/toaster';
import { Route as EmployeeRoute } from '@routes/employees.index.tsx';
import { Route as SettingsClaimsRoute } from '@routes/settings.claims.local.index.tsx';
import { Route as ProductsRoute } from '@routes/products.index.tsx';
import { Route as IndexRoute } from '@/routes';


import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { defaultGetProductsRequest } from '@features/products/queries/getProducts.ts';
import { cn } from '@utils';
import { defaultGetEmployeesRequest } from '@features/employees/queries/getEmployees.ts';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '@components/ui/button.tsx';
import { Avatar, AvatarFallback } from '@components/ui/avatar.tsx';
import { useAuth } from '@hooks/useAuth.ts';

export default function RootLayout() {
  const navigate = useNavigate();
  const progress = useUiStore((state) => state.topLoadingBarProgress);
  const setProgress = useUiStore((state) => state.setTopLoadingBarProgress);
  const {
    location: { pathname }
  } = useRouterState();
  const { theme } = useTheme();
  const authContext = useAuth();
  const userInitials = (authContext.userClaims!.firstName!.charAt(0) + authContext.userClaims!.lastName!.charAt(0)).toUpperCase();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      const errorProperties: object = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        errorType: event.error?.name || 'Unknown',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        stack: event.error?.stack,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        componentStack: event.error?.componentStack,
        uri: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      logger.logError('{message}', errorProperties);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <>
      <LoadingBar
        containerStyle={{ top: 1, zIndex: 9999 }}
        height={1}
        shadow={false}
        color="rgb(46, 194, 224)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex min-h-screen w-full flex-col bg-background">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void navigate({ to: SettingsClaimsRoute.to })}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem disabled={true}>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.reload()}>Reload</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={IndexRoute.to}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AuthorizeView role={appRoles.productsRead}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={ProductsRoute.to}
                      search={defaultGetProductsRequest}
                      className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        pathname.startsWith('/products/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90')}
                    >
                      <Package className="h-5 w-5" />
                      <span className="sr-only">Products</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Products</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AuthorizeView>
            <AuthorizeView role={appRoles.employeesRead}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={EmployeeRoute.to}
                      search={defaultGetEmployeesRequest}
                      className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        pathname.startsWith('/employees/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90')}
                    >
                      <Users2 className="h-5 w-5" />
                      <span className="sr-only">Employees</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Employees</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AuthorizeView>




          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={SettingsClaimsRoute.to}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                      pathname.startsWith('/settings/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90')}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:pl-14">
          <main className="space-y-6 p-10 pb-16 pt-7 md:block">
            <Outlet />
          </main>
        </div>
      </div>

      <Toaster />
      <TanStackRouterDevtools position={'bottom-right'} />
    </>
  );
}

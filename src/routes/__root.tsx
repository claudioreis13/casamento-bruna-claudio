import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/wedding/Nav";
import { Footer } from "@/components/wedding/Footer";
import { Toaster } from "@/components/ui/sonner";
import { RouteTransition } from "@/components/wedding/RouteTransition";
import { CustomCursor } from "@/components/wedding/CustomCursor";



function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary-dark">404</h1>
        <p className="mt-2 text-muted-foreground">Página não encontrada.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#6B7A4E" },
      { title: "Bruna & Cláudio 💍 — 10/10/2026" },
      {
        name: "description",
        content:
          "Site oficial do casamento de Bruna e Cláudio — 10 de outubro de 2026, Igreja Matriz de Nepomuceno/MG.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Bruna & Cláudio 💍 — 10/10/2026" },
      {
        property: "og:description",
        content:
          "Estamos muito felizes em compartilhar esse momento com você! Confira a lista de presentes e informações da cerimônia.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bruna & Cláudio 💍 — 10/10/2026" },
      { name: "description", content: "A wedding website for Bruna and Cláudio, featuring event details, gift registry, and interactive elements." },
      { property: "og:description", content: "A wedding website for Bruna and Cláudio, featuring event details, gift registry, and interactive elements." },
      { name: "twitter:description", content: "A wedding website for Bruna and Cláudio, featuring event details, gift registry, and interactive elements." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bdf392d4-6472-4e5e-a56e-b607f95a45f5/id-preview-55fd13af--62b47273-69a3-41f7-aeea-ae327657b610.lovable.app-1779404452429.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bdf392d4-6472-4e5e-a56e-b607f95a45f5/id-preview-55fd13af--62b47273-69a3-41f7-aeea-ae327657b610.lovable.app-1779404452429.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Performance: preconnect e preload responsivo do LCP
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "icon",
        type: "image/png",
        href: "/logo-bc.png",
      },
    ],


  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_INIT_SCRIPT = `(function(){try{var k='tema',v=localStorage.getItem(k);if(v==='escuro')v='dark';if(v==='claro')v='light';if(v!=='dark'&&v!=='light'){v=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(v==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <RouteTransition>
            <Outlet />
          </RouteTransition>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </QueryClientProvider>
  );
}


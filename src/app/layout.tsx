import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "NEXUS · Etapa 1 — Comunicação Interna e Feedback",
  description:
    "Apresentação da Etapa 1: Protocolo SCI de Feedback Interno para a Nexus Serviços & Logística, numa experiência estilo Netflix.",
  applicationName: "NEXUS",
  manifest: `${basePath}/manifest.webmanifest`,
  metadataBase: new URL("https://bughir0.github.io/nexus-etapa1-apresentacao"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NEXUS",
  },
  icons: {
    icon: [{ url: `${basePath}/icon`, type: "image/png" }],
    apple: [{ url: `${basePath}/apple-icon`, type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#E50914",
  colorScheme: "dark",
};

/** Remove attrs injetados por extensões (Bitdefender etc.) antes da hidratação. */
const stripExtensionAttrs = `
(function () {
  var ATTRS = ["bis_skin_checked", "bis_register"];
  function scrub(node) {
    if (!node || node.nodeType !== 1) return;
    for (var i = 0; i < ATTRS.length; i++) {
      if (node.hasAttribute && node.hasAttribute(ATTRS[i])) {
        node.removeAttribute(ATTRS[i]);
      }
    }
    var list = node.querySelectorAll ? node.querySelectorAll("[" + ATTRS.join("],[") + "]") : [];
    for (var j = 0; j < list.length; j++) {
      for (var k = 0; k < ATTRS.length; k++) list[j].removeAttribute(ATTRS[k]);
    }
  }
  scrub(document.documentElement);
  var obs = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.type === "attributes" && ATTRS.indexOf(m.attributeName) !== -1) {
        m.target.removeAttribute(m.attributeName);
      }
      if (m.addedNodes) {
        for (var n = 0; n < m.addedNodes.length; n++) scrub(m.addedNodes[n]);
      }
    }
  });
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ATTRS,
    childList: true,
    subtree: true,
  });
  window.addEventListener("DOMContentLoaded", function () { scrub(document.documentElement); });
  window.addEventListener("load", function () {
    scrub(document.documentElement);
    setTimeout(function () { obs.disconnect(); }, 4000);
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${fraunces.variable} antialiased`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }} />
        {children}
      </body>
    </html>
  );
}

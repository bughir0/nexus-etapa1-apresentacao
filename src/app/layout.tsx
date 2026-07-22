import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "NEXUS · Etapa 1 — Comunicação Interna e Feedback",
  description:
    "Apresentação da Etapa 1: Protocolo SCI de Feedback Interno para a Nexus Serviços & Logística, numa experiência estilo Netflix.",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
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

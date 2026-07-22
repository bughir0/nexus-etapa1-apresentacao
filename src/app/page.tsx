import { App } from "@/components/App";
import { ClientOnly } from "@/components/ClientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <App />
    </ClientOnly>
  );
}

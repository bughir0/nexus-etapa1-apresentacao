# Nexus · Etapa 1 — Apresentação (estilo Netflix)

Site Next.js da apresentação **Comunicação Interna e Feedback** para a Nexus Serviços & Logística.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## GitHub Pages

URL publicada:

**https://bughir0.github.io/nexus-etapa1-apresentacao/**

### Ativar (uma vez no GitHub)

1. Repo → **Settings** → **Pages**
2. **Source**: GitHub Actions  
   *(ou branch `gh-pages` / pasta `/ (root)`)*
3. Faça merge da branch na `master` (o workflow deploya automaticamente)

### Build estático local

```bash
npm run build:pages
```

A pasta `out/` é o site estático.

### Controles do player

- `←` `→` ou botões: navegar episódios
- `Espaço`: próximo
- `E`: abrir lista de episódios
- `M`: mute
- `F`: tela cheia
- `Esc`: sair
- Swipe no celular

export type Profile = {
  id: string;
  name: string;
  /** Gradiente CSS do avatar (fallback se a foto faltar) */
  avatar: string;
  /** Inicial(is) sem foto */
  initials: string;
  /** Foto em /public/profiles/... */
  photo?: string;
};

export const profiles: Profile[] = [
  {
    id: "samuel",
    name: "Samuel",
    initials: "S",
    avatar: "linear-gradient(145deg, #e50914 0%, #7a0a10 100%)",
    photo: "/profiles/samuel.jpg",
  },
  {
    id: "riquelme",
    name: "Riquelme",
    initials: "R",
    avatar: "linear-gradient(145deg, #1f7a6c 0%, #0c3d36 100%)",
    photo: "/profiles/riquelme.jpg",
  },
  {
    id: "guilherme",
    name: "Guilherme",
    initials: "Gh",
    avatar: "linear-gradient(145deg, #3b82f6 0%, #1e3a8a 100%)",
    photo: "/profiles/guilherme.jpg",
  },
  {
    id: "gustavo",
    name: "Gustavo",
    initials: "Gs",
    avatar: "linear-gradient(145deg, #f59e0b 0%, #92400e 100%)",
    photo: "/profiles/gustavo.jpg",
  },
  {
    id: "joao",
    name: "João",
    initials: "J",
    avatar: "linear-gradient(145deg, #a855f7 0%, #4c1d95 100%)",
    photo: "/profiles/joao.jpg",
  },
];

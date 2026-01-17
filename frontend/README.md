# Crop Frontend

Interface web para recortar imagens e GIFs animados.

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

### Variáveis de Ambiente (Desenvolvimento)

Crie um arquivo `.env.local`:

```env
VITE_API_URL=http://localhost:3001
```

## Deploy no Dokploy

1. Crie uma nova **Application** no Dokploy
2. Configure o repositório Git apontando para este projeto
3. **Build Args** (importante!):
   - `VITE_API_URL`: URL do backend (ex: `https://crop-api.seudominio.com`)
4. Gere um domínio (ex: `crop.seudominio.com`)
5. **Container Port**: 80
6. Clique em Deploy

### Configuração do Build Args no Dokploy

No Dokploy, vá em **Environment** > **Build Args** e adicione:

```
VITE_API_URL=https://crop-api.seudominio.com
```

⚠️ **IMPORTANTE**: A variável `VITE_API_URL` é injetada em tempo de BUILD, não em runtime. Se você mudar a URL do backend, precisará fazer um novo deploy.

## Docker

```bash
# Build (substitua a URL pelo seu backend)
docker build --build-arg VITE_API_URL=https://crop-api.seudominio.com -t crop-frontend .

# Run
docker run -p 80:80 crop-frontend
```

## Estrutura

```
crop-frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilitários (gifProcessor, imageProcessor)
│   ├── types/          # Tipos TypeScript
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Entry point
├── public/             # Assets estáticos
├── nginx.conf          # Configuração do Nginx
├── Dockerfile          # Build de produção
└── package.json
```

## Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `VITE_API_URL` | URL completa do backend | Sim (para GIFs) |

**Nota**: Se `VITE_API_URL` não for definida, o crop de imagens estáticas (PNG, JPG) ainda funcionará, mas o crop de GIFs animados não funcionará.
# Crop Backend - GIF Processor API

API para processamento e recorte de GIFs animados usando Gifsicle.

## Tecnologias

- Node.js
- Express
- TypeScript
- Gifsicle

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Informações do serviço |
| GET | `/api/gif/health` | Health check |
| POST | `/api/gif/crop` | Recortar GIF |

### POST /api/gif/crop

Recorta um GIF animado.

**Form Data:**
- `file`: Arquivo GIF
- `x`: Posição X do recorte
- `y`: Posição Y do recorte
- `width`: Largura do recorte
- `height`: Altura do recorte
- `colors`: (opcional) Número de cores (padrão: 256)

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Instalar gifsicle (necessário)
# Ubuntu/Debian
sudo apt-get install gifsicle

# macOS
brew install gifsicle

# Rodar em desenvolvimento
npm run dev

# Build
npm run build

# Rodar em produção
npm start
```

## Deploy no Dokploy

1. Crie uma nova **Application** no Dokploy
2. Configure o repositório Git apontando para este projeto
3. Configure as variáveis de ambiente:
   - `PORT`: 3001 (ou outra porta)
   - `NODE_ENV`: production
4. Gere um domínio (ex: `crop-api.seudominio.com`)
5. **Container Port**: 3001
6. Clique em Deploy

## Docker

```bash
# Build
docker build -t crop-backend .

# Run
docker run -p 3001:3001 -e PORT=3001 -e NODE_ENV=production crop-backend
```

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | 3001 |
| `NODE_ENV` | Ambiente (development/production) | development |
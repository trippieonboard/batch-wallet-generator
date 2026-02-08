#  Batch EVM Wallet Generator

Production-ready Farcaster Mini App (Frames v2) для пакетной генерации EVM кошельков с проверкой балансов на Ethereum и Base.

##  Возможности

-  **Безопасная генерация**: Все приватные ключи генерируются на клиенте (в браузере)
-  **Пакетная генерация**: Генерируйте от 1 до 50 кошельков за раз
-  **Проверка балансов**: Автоматическая проверка на Ethereum и Base
-  **Click-to-Copy**: Одна кнопка для копирования адреса
-  **Маскировка ключей**: Приватные ключи скрыты по умолчанию
-  **Минималистичный дизайн**: Темная тема (zinc-950)

##  Быстрый старт

\\\ash
npm install
npm run dev
\\\

Откройте http://localhost:3000

##  Структура

- src/app - Next.js App Router (layout, page)
- src/lib - Утилиты (wallet-utils, rpc-client)
- src/hooks - React хуки (useWalletGenerator, useBalanceChecker)
- src/app/components - React компоненты (WalletCard, GeneratorControls)
- public - Статические файлы (farcaster.json)

##  Безопасность

Все приватные ключи генерируются ТОЛЬКО на клиенте. Никогда не отправляются на сервер.

##  Технологии

- Next.js 14
- React 19
- TypeScript
- Viem 2.45+ (криптография)
- Tailwind CSS
- Blockscout API (история транзакций)

##  RPC Endpoints (Бесплатные)

- Ethereum: https://cloudflare-eth.com
- Base: https://mainnet.base.org
- Blockscout: https://eth.blockscout.com/api & https://base.blockscout.com/api

##  Развертывание

1. Push на GitHub
2. Импортировать на Vercel
3. Получить HTTPS домен
4. Верифицировать на Farcaster Developer Tools

##  by trippieonboard

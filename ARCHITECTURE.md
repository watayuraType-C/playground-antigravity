# Architecture Overview

本プロジェクトは、食材在庫管理とAIによるレシピ提案を行うマイクロサービスアーキテクチャのWebアプリケーションです。

## システム構成図

```mermaid
graph TD
    User[ユーザー (Browser)]
    
    subgraph "Frontend Application"
        WebApp[Web App (apps/web)]
    end
    
    subgraph "Backend Microservices"
        InvService[Inventory Service (apps/inventory)]
        RecService[Recipe Service (apps/recipe)]
    end
    
    subgraph "External & Infrastructure"
        DB[(SQLite / Prisma)]
        Gemini[Google Gemini API]
    end

    User -->|Access UI| WebApp
    
    WebApp -->|HTTP / REST| InvService
    WebApp -->|HTTP / REST| RecService
    
    InvService -->|CRUD| DB
    
    RecService -->|Generate Recipe| Gemini
    RecService -.->|Get Ingredients (Server-to-Server / Optional)| InvService
```
※ Recipe Service が在庫情報を必要とする場合、Web Appが在庫情報を送るか、Recipe ServiceからInventory Serviceへ問い合わせるかの2パターンがありますが、今回はシンプルに **Web Appが在庫情報を取得してRecipe Serviceに渡す**、または **Recipe Serviceが必要に応じてInventory Serviceを叩く** 形式を想定します。(Implementation PlanではWeb Appが在庫リストを渡す設計としています)

## 技術スタック (Tech Stack)

### Core
- **Monorepo Manager**: Turborepo
- **Package Manager**: npm/pnpm 
- **Language**: TypeScript

### Applications & Services
1. **Frontend (`apps/web`)**
   - **Role**: ユーザーインターフェース
   - **Framework**: Next.js (App Router)
   - **Features**: 在庫一覧表示・操作画面、レシピ提案表示画面

2. **Inventory Service (`apps/inventory`)**
   - **Role**: 在庫管理 API
   - **Framework**: Next.js (API Routes only)
   - **Database Access**: Prisma Client

3. **Recipe Service (`apps/recipe`)**
   - **Role**: レシピ提案 API
   - **Framework**: Next.js (API Routes only)
   - **AI Integration**: Google Generative AI SDK (Gemini)

### Shared Packages (`packages/`)
- **`database`**: Prisma Schema, Client 生成
- **`types`**: 共有型定義 (APIレスポンス型など)
- **`config`**: 共通設定

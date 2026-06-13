# Pixel Divination Style Guide

本指南旨在统一项目代码风格，提高代码质量和可维护性。所有贡献者在提交代码前请务必阅读并遵守以下规范。

## 1. 核心原则

- **类型安全**：充分利用 TypeScript 的类型系统，避免使用 `any`。
- **组件化**：保持组件短小精悍，逻辑与视图分离。
- **样式统一**：统一使用 Tailwind CSS 进行样式开发。
- **交互流畅**：确保用户交互有即时反馈（Loading 状态、Toast 提示）。

## 2. TypeScript 规范

### 2.1 类型定义
- **接口命名**：使用 `PascalCase`，无需 `I` 前缀（例如 `User` 而非 `IUser`）。
- **显式类型**：关键函数参数和返回值应显式标注类型。
- **避免 Any**：
    - ❌ `const handleData = (data: any) => { ... }`
    - ✅ `const handleData = (data: UserData) => { ... }`

### 2.2 常见问题与修复
- **日期处理**：
    - 后端/Store 中通常存储 ISO 字符串 (`string`)。
    - UI 组件（如 DatePicker）可能需要 `Date` 对象或特定的字符串格式。
    - **修复示例**：在传递给组件前进行转换，组件回调返回后立即格式化为存储格式。
    ```tsx
    // ❌ 错误：类型不匹配
    initialDate={new Date(profile.birthDate)} // DatePicker 期望 string
    
    // ✅ 正确
    initialDate={profile.birthDate}
    ```

- **Store 类型映射**：
    - 调用 API 时注意参数类型匹配。
    - **修复示例**：
    ```tsx
    // ❌ 错误：传入对象数组，API 期望字符串数组
    fetchTarotReading(selectedCards, question)
    
    // ✅ 正确：提取名称并按正确顺序传参
    const cardNames = selectedCards.map(c => c.name);
    fetchTarotReading(question, cardNames)
    ```

## 3. React 组件规范

- **函数组件**：统一使用 `React.FC<Props>` 或直接解构 props。
- **Hooks**：
    - 遵循 Hooks 规则（只在顶层调用）。
    - 自定义 Hooks 命名以 `use` 开头。
- **副作用**：`useEffect` 必须包含完整的依赖数组。

## 4. 样式规范 (Tailwind CSS)

- **类名顺序**：建议遵循 Layout -> Box Model -> Typography -> Visual -> Misc 的顺序（或使用 Prettier 插件自动排序）。
- **条件样式**：使用 `clsx` 或 `tailwind-merge` 处理动态类名。
- **CSS 警告**：
    - VS Code 可能会报 `Unknown at rule @tailwind`。
    - **解决方案**：已在 `.vscode/settings.json` 中配置忽略规则。

### 4.1 全局视觉风格 (Global Visual Style)
为了保持复古科幻（Retro Sci-Fi）的视觉体验，所有页面应遵循以下样式标准：

- **全局特效**：
    - 页面根容器必须包含 scanlines 和 vignette 层。
    - 使用 `index.css` 中的 `.scanlines` 和 `.vignette` 类。

- **卡片样式 (Glassmorphism)**：
    - 背景色统一使用 `rgba(30, 41, 59, 0.6)`。
    - 必须应用 `backdrop-filter: blur(10px)`。
    - 边框颜色统一使用 `rgba(255, 255, 255, 0.1)`。
    - 示例：`className="bg-slate-800/60 backdrop-blur-md border border-white/10"`

- **字体与排版**：
    - 关键数据（如价格、评分、运势指数）使用 `font-vt323`。
    - 强调文字应应用霓虹阴影效果（如 `.neon-text-purple`, `.neon-text-yellow`）。

## 5. Linting & Workflow

### 5.1 Lint 检查
项目使用 ESLint 进行代码质量检查。
运行检查：
```bash
npm run lint
```

### 5.2 Pre-commit Hook 配置 (推荐)
为了防止将错误代码提交到仓库，建议配置 `husky` 和 `lint-staged`。

**安装依赖：**
```bash
npm install --save-dev husky lint-staged
npx husky init
```

**配置 `package.json`：**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

**配置 `.husky/pre-commit`：**
```bash
npx lint-staged
```

## 6. 目录结构
- `src/components`: 通用 UI 组件
- `src/pages`: 页面级组件
- `src/stores`: Zustand 状态管理
- `src/services`: API 请求与业务逻辑
- `src/types`: 全局类型定义
- `src/lib`: 工具函数

---
*Last Updated: 2025-12-02*

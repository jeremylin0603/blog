# \*Github

## Actions

### 設定

#### 基本設定

```yml
# workflow name
name: Deploy GitHub Pages

# trigger condition
on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    # 執行步驟
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Build dist
        run: npm install && npm run docs:build

      # 部署到 GitHub Pages
      - name: Deploy to Github Pages
        # 直接用別人寫好的 action
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: docs/.vuepress/dist
```

### 進階設定

```yml

```

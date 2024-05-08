# \*Github

## Multiple Account on macOS

### ref

ref from [link](https://medium.com/cyen6/%E5%A6%82%E4%BD%95%E4%B8%80%E5%8F%B0%E9%9B%BB%E8%85%A6%E4%BD%BF%E7%94%A8%E5%A4%9A%E5%80%8B-git-%E5%B8%B3%E8%99%9F-144d9582ff09)

### 以下的範例以這兩個帳號做示範：

個人 email：personal@gmail.com  
公司 email：work@gmail.com

### 進入 .ssh 資料夾

```
cd ~/.ssh
```

在這裡我們要建立 ssh key，先來處理個人帳號

```
ssh-keygen -t rsa -C "personal@gmail.com"
```

ssh-keygen 是用來建立 key 的指令  
-t rsa 則是要建立金鑰的類型，這邊選 rsa  
-C “personal@gmail.com” 是要幫你的公開金鑰檔案結尾加上註解，讓你好辨識用，通常會使用電子信箱，也可以使用任何你方便的記號

輸入之後，他會問你幾個問題：

Enter file in which to save the key (/Users/myaccount/.ssh/id_rsa):  
這邊輸入你想取的金鑰名稱，如果想取 personal 的話，就輸入 /Users/cyen/.ssh/id_rsa_personal

2. Enter passphrase (empty for no passphrase):

接下來會問你要不要設定密碼，如果有設定，每次使用這個 key 都要輸入密碼。如果不要設密碼，直接按 enter 就好。

3. 下一題是再打一次密碼，沒設定的話繼續按 enter 就好

建立好之後你，你可以輸入 ls 查看，應該會生成兩個金鑰，有 .pub 副檔名的是公鑰，沒有的是私鑰。

id_rsa_personal #私鑰  
id_rsa_personal.pub #公鑰  
個人帳號金鑰建立好之後，繼續建立公司帳號金鑰，同樣的動作再做一次。

### 設定 SSH-KEY 公鑰

都建立好之後，接下來就是把公鑰放到相對應的位置  
看你有幾個 github 帳號，重複登錄公鑰到對應 github 帳號直到所有 key 都登錄完成。

### SSH 設定

在 .ssh 資料夾下建立一個 config 檔案

```
touch config
```

設定裡面的內容，這邊我用 vim 打開

```
vim config
```

```
# 預設帳號 （個人帳號）
Host personal
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_rsa_personal
# 工作帳號
Host work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_work
# 其他帳號 ...
```

主要要設定的是 Host 還有 IdentityFile，Host 後面的名稱可以自己取，等等會用到；IdentityFile 則是對應到剛剛產生的 ssh key 的檔案名稱，這裡使用私鑰。

### 設定 git remote

如果這個專案還沒有設定 git remote 的話

```
git remote add origin git@personal:你的github帳號/你的github資料夾.git
```

要注意的就是 @ 後面要填上對應的名稱，請參考你剛剛寫的 Host，這樣就完成摟！

如果這個專案已經設定過 git remote 了，可以刪掉原本的 remote 再加一次，或是進去 .git 裡面改，以下說明進去 .git 裡面改的步驟：

先進到這個專案的根目錄
進入 .git，並且編輯 config
cd .git
vim config 3. 他會問你要做什麼操作，按 e 編輯

```
[remote "github"]
         url = git@personal:你的github帳號/你的github資料夾.git
         fetch = +refs/heads/*:refs/remotes/github/*
```

把這邊的 url 改成你要的，儲存關閉就可以了，vim 的操作跟前面一樣。

到這裡就算設定完成，接下來你去執行 push, pull 等和 github 有關的動作時，應該就可以正常進行了！

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

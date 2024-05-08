# Siege & Coreutils 壓測工具

## Install siege & coreutils

```
brew install siege
brew install coreutils
```

> coreutils UNIX 內建但 MacOS 要主動安裝

### 工具簡介

1. siege 是一個 HTTP 壓力測試工具，可以模擬多個用戶同時訪問你的網站，以測試你的伺服器在高負載下的性能。在你的命令中，-c 20 表示同時有 20 個用戶訪問你的網站。
2. coreutils 是一個包含許多基本工具（如 ls、cat、cp、date、echo 等）的軟體包。這些工具在 Linux 系統中是內建的，但在 macOS 中需要通過 brew 安裝。
3. gtimeout 是 coreutils 套件中的一個工具，用於在指定時間後終止一個命令。在你的命令中，gtimeout 30 表示 siege 命令將在 30 秒後被終止。

> siege 工具的默認行為是持續發送請求，手動停止它(control + c)，或者它達到了設定的請求次數或時間限制。

### 指令

`gtimeout 5 siege -c 1000 http://localhost:3000`
5 秒後結束指令，siege 會開始模擬 1000 個用戶併發請求(用戶請求結束會繼續下一次請求，直到滿足設定的時間或次數)

`siege -c 1 -r 10 http://localhost:3000`
模擬一個用戶請求，發送 10 次請求後停止

`siege -c 1 -t 1M http://localhost:3000`
模擬一個用戶請求，持續請求到 1 分鐘後停止，時間格式為 [Hh][Mm][Ss]，這邊直接用 gtimeout 取代，試著用用看比會記得之後可以用在其他地方

### siege report

```terminal
Lifting the server siege...
Transactions:		         180 hits
Availability:		      100.00 %
Elapsed time:		        4.98 secs
Data transferred:	        8.51 MB
Response time:		        0.03 secs
Transaction rate:	       36.14 trans/sec
Throughput:		        1.71 MB/sec
Concurrency:		        0.99
Successful transactions:         180
Failed transactions:	           0
Longest transaction:	        0.20
Shortest transaction:	        0.00
```

- Transactions: 測試期間完成的 HTTP 交易（請求和回應）的總數。在這裡，完成了 180 次交易。
- Availability: 伺服器可用性的百分比。如果所有請求都成功，則為 100%。在這裡，所有請求都成功，所以可用性為 100%。
- Elapsed time: 測試的總時間，以秒為單位。在這裡，測試持續了 4.98 秒。
- Data transferred: 測試期間傳輸的總數據量，以 MB 為單位。在這裡，傳輸了 8.51 MB 的數據。
- Response time: 伺服器回應請求的平均時間，以秒為單位。在這裡，平均回應時間為 0.03 秒。
- Transaction rate: 每秒完成的交易數。在這裡，每秒完成了 36.14 次交易。
- Throughput: 每秒傳輸的數據量，以 MB 為單位。在這裡，每秒傳輸了 1.71 MB 的數據。
- Concurrency: 平均並發數。在這裡，平均並發數為 0.99。
- Successful transactions: 成功的交易數。在這裡，有 180 次交易成功。
- Failed transactions: 失敗的交易數。在這裡，沒有交易失敗。
- Longest transaction: 最長的交易時間，以秒為單位。在這裡，最長的交易時間為 0.20 秒。
- Shortest transaction: 最短的交易時間，以秒為單位。在這裡，最短的交易時間為 0.00 秒。

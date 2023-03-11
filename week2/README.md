# 今晚，我想來點點簽 

![image](https://user-images.githubusercontent.com/22139550/223084406-62fdfea2-3aa5-4d1d-8390-0b9fa81c8b4d.png)

![image](https://user-images.githubusercontent.com/22139550/223066068-444fc6b3-09a6-49ee-b73b-5dd348b5df58.png)

[關卡資訊](https://2022.thef2e.com/news/week2)

UI 設計稿件：[Figma](https://www.figma.com/file/xINlkpj0AowEGQDVwahjqj/Week2---%E4%BB%8A%E6%99%9A%EF%BC%8C%E6%88%91%E6%83%B3%E4%BE%86%E9%BB%9E%E9%BB%9E%E7%B0%BD?node-id=0%3A1)

感謝參賽者 [Claudia](https://2022.thef2e.com/users/12061549261452684531/) 提供稿件

## 使用流程說明

[DEMO](https://penspulse326.github.io/2022F2E/week2/#/)

### 使用前須知

此 Web App 僅實作 Desktop 與 Mobile 兩種版面

***未實作部份***
- 登入
- 拍照
- PDF 瀏覽僅縮放功能
- 新增文字
- 新增日期
- Mobile 版僅切版，功能還未整合

如有其他疏忽部份請見諒，也歡迎提出問題

----

### 1. 上傳文件

  點選按鈕上傳 PDF 檔案（限 PDF 檔/ 不超過 1MB）

![image](https://user-images.githubusercontent.com/22139550/223064401-ce4fdc35-f509-4809-8761-ae81405db4be.png)
<br>
<br>
<br>
### 2. 新增簽名

  點選右側選單按鈕 

![image](https://user-images.githubusercontent.com/22139550/223065566-8177bc88-c956-407f-a640-ff021a4e5ccb.png)

  會呼叫出簽名版面，使用滑鼠或手指進行簽名，可選擇畫筆顏色，按下建立後即可儲存繪製好的簽名
  最多可儲存三組簽名，超過會有警告視窗提示
<br>
<br>
<br>
### 3. 選擇與刪除簽名

儲存好的簽名如下圖顯示

![image](https://user-images.githubusercontent.com/22139550/223066373-69caa330-3ff3-46e2-8154-2b48b7917bc6.png)

Mobile 版則要按下***選擇按鈕***顯示

![image](https://user-images.githubusercontent.com/22139550/223066714-a0241005-e66c-4dc7-b3bc-3f71db77630f.png)

點選簽名或此圖案 ![image](https://user-images.githubusercontent.com/22139550/223066815-081bb79e-9c95-4d2b-b5dc-3e1450d04513.png) 即可將簽名新增在當前頁面
點選此圖案 ![image](https://user-images.githubusercontent.com/22139550/223067029-28ecf86b-0a1b-4701-b288-a8e9978813c6.png) 刪除簽名
<br>
<br>
<br>
### 4. PDF 區塊

新增在 PDF 頁面上的簽名，點選後可以調整位置或大小，可以同時新增多個簽名

![image](https://user-images.githubusercontent.com/22139550/223068123-0f6cedc2-10a3-4e52-95cd-bc4ea9c87650.png)

操作面板僅實作縮放功能

![image](https://user-images.githubusercontent.com/22139550/223085171-9f46f5e1-4c3d-4ce1-8c89-31cffe2a7509.png)
<br>
<br>
<br>
### 5.  預覽頁面

左側的選單可以瀏覽該 PDF 其他頁面，也能在該頁面新增簽名

***Mobile 版無此功能***

![image](https://user-images.githubusercontent.com/22139550/223068291-24774aa3-b16d-465d-bfe0-fe0b29a04ab8.png)
<br>
<br>
<br>
### 6. 儲存檔案 

按下![image](https://user-images.githubusercontent.com/22139550/223069160-a25791bf-5d57-4d85-8a91-11b93b3cfa6b.png)將自動下載簽署完畢的 PDF 檔
<br>
<br>
<br>

## 技術套件

- React
- styled-components
- React-Router
- jsPDF
- fabric.js
- PDF.js

## 本地端執行

複製專案

```
git clone https://github.com/penspulse326/2022F2E.git
```

切換分支

```
git checkout dev
```

切換目錄

```
cd week2
```

安裝套件

```
npm install
```

or

```
yarn install
```

執行專案

```
npm run start
```

or

```
yarn start
```

如未轉跳頁面請輸入下列網址即可進入該 Web App

```
http://localhost:3000/
```
----
如有問題歡迎與我聯繫： penspulse@gmail.com


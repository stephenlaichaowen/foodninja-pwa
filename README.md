# PWA Tutorial

## The Web App Manifest

## Service Workers (js file)
> javascript files run on main thread
> service worker runs on separate thread

### Features
- Load content offline
- Use background sync
- Use push notifications

### What does Service Worker do ?
- listen for fetch requests, push messages, etc.
  
## Service Worker Lifecycle
> Place sw.js in the root directory to control all files/directories
- register the service worker (sw.js) (O)
- install event ()
- service worker become active
- active event
- service worker 'listens' for events

## Registering a Service Worker

## install event
- 把伺服器的資源 (檔案, 圖片等) 安裝到瀏覽器的快取存儲
- 只要伺服器有變動 (檔案內容修改, 圖片新增刪除), 瀏覽器都匯到伺服器撈取要安裝的資源到快取存儲 
- Service Worker 必須在伺服器, 不能安裝到快取存儲, 不然快取檔案永遠不能更新 !!!

## active event

## the install banner 
- connects your mobile phone through use to your computer, the install banner will prompt up !

## Offline Mode

## Pre-Caching Assets (Offline experiences)

## Cache Versioning
- 伺服器端的檔案更動, 我們同時也要修改 Service Worker 版本
- 伺服器通知瀏覽器檔案有異動
- 瀏覽器到伺服器取得更新資源, 除舊版快取, 安裝新版快取
  
## Dynamic Cache
we don't want to precache about and contact pages, we want these two pages dynamically cached,
so we 

## Offline Fallback Page
404 page

## Conditional Fallbacks

## Limiting Cache Size


Versions:
- v14: add maskable icon in manifest
- v15: change title in home page
- v16: change title in home page again
- v17: update title in home page 
- v18: update title in home page 
- v19: update title in home page 
- v20: update title in home page 

# Firebase Cloud Functions Development
Cloud Functionsの開発環境

## Requirements

| Tools        | Version |
| ------------ | ------- |
| Firebase CLI | 8.4.1   |
| Node.js      | 10  |
| Typescript   | 3.9.5   |


## 開発環境構築

* ローカル環境の保護、依存性管理のためにDockerの利用
* コンテナ内での開発効率化のために、[VS Code Remote Development](https://code.visualstudio.com/docs/remote/containers) を利用

### Dockerのセットアップ
1. [Docker Desktop for Windows/Mac](https://www.docker.com/products/docker-desktop)をインストール
2. Dockerタスクバー項目を右クリックして、`Preferences > Shared Drives / File Sharing` からコンテナで開くソースコードの場所を追加する

### VSCodeのセットアップ
1. [Visual Studio Code](https://code.visualstudio.com/)をインストール
2. [Remote Developmentプラグイン](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)をVSCodeにインストール
3. VSCodeを起動し、コマンドパレット(⇧⌘P)から`Remote-Containers: Open Folder in Container`を選択し、cloneしたディレクトリを開く
    - `docker build`が実行されるので少し時間がかかります
4. Firebase CLIにログイン
    - VSCodeでターミナルを起動すればコンテナ内のシェルが起動する
    - `$ firebase login`

## [WIP]デバッグ

## [WIP]Deploy


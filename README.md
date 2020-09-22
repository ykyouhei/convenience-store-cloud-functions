# Firebase Cloud Functions Development

Cloud Functions の開発環境

## Requirements

| Tools        | Version |
| ------------ | ------- |
| Firebase CLI | 8.9.2   |
| Node.js      | 12      |
| Typescript   | 3.9.7   |

## 開発環境構築

- ローカル環境の保護、依存性管理のために Docker の利用
- コンテナ内での開発効率化のために、[VS Code Remote Development](https://code.visualstudio.com/docs/remote/containers) を利用

### Docker のセットアップ

1. [Docker Desktop for Windows/Mac](https://www.docker.com/products/docker-desktop)をインストール
2. Docker タスクバー項目を右クリックして、`Preferences > Shared Drives / File Sharing` からコンテナで開くソースコードの場所を追加する

### VSCode のセットアップ

1. [Visual Studio Code](https://code.visualstudio.com/)をインストール
2. [Remote Development プラグイン](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)を VSCode にインストール
3. VSCode を起動し、コマンドパレット(⇧⌘P)から`Remote-Containers: Open Folder in Container`を選択し、clone したディレクトリを開く
   - `docker build`が実行されるので少し時間がかかります
4. Firebase CLI にログイン
   - VSCode でターミナルを起動すればコンテナ内のシェルが起動する
   - `$ firebase login`

## [WIP]デバッグ

## [WIP]Deploy

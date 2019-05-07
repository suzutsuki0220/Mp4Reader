[![Maintainability](https://api.codeclimate.com/v1/badges/9581a072f848bddb4db3/maintainability)](https://codeclimate.com/github/suzutsuki0220/Mp4Reader/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9581a072f848bddb4db3/test_coverage)](https://codeclimate.com/github/suzutsuki0220/Mp4Reader/test_coverage)
[![GitHub license](https://img.shields.io/github/license/suzutsuki0220/jsUtils.svg)](https://github.com/suzutsuki0220/Mp4Reader/blob/master/LICENSE)

# Mp4Reader

MP4/MOVファイルのatom構造を解析して可視化するツールです。バイナリをHEXで表示するだけでなく、データ構造を表形式で表示したりatom単位でファイルに書き出すこともできます。

# 動作環境

* Windows 7/8/10 (64bit)
    * 32bit環境では動作しません
    * electronアプリなのでパッケージを作ればmacOSやLinuxでも動くはずです。Windows以外の環境を所持していないためにWindowsのみとなっております。

# 使い方

1. [releases](https://github.com/suzutsuki0220/Mp4Reader/releases) のzipファイルをダウンロードして、解凍した中からexeファイルを実行してください
2. [Choose a file] ボタンをクリックして解析したいファイルを選択すると、ファイルが読み込まれてatomの階層構造を表示します
    * atomの名前に続いてpayloadのサイズを () 内に表示します
    * サイズの大きなファイルは表示されるまでに時間がかかる可能性があります
    * GB単位の巨大なファイルを読み込ませると解析を諦めてしまい、フリーズするかもしれません
3. 中身を確認したいatomを選択すると、右側にpayload(atomのdataの中身)が表示されます
    * [Preview] タブをクリックするとテーブルで見やすく表示します
    * [Hex] タブをクリックするとHexで表示します
    * [Download] タブをクリックするとpayloadをファイルに書き出します

# おことわり

* 「atom」はMP4の仕様的に「box」と呼ぶ事が多いかもしれませんが、本ツールではMOVの解析から始めた流れで「atom」と呼んでいます
* MP4の規格は ISO/IEC 14496 で定義されていますが、大元の規格書を取得するには2万円弱の費用が発生するため、本ツールはお金をかけずにインターネットから得られる部分的な情報を基にしています。それ故、本ツールの解析結果による正確性は保障できません
* Preview で表形式で表示できるのは一部の僅かなAtomのみです。表形式で表示でない場合は Hex で表示されます

# おまけ

* AVIファイルも読み込めるかもしれません。動いたとしても以下の条件付きになります
    * 本ツールでは、用語として「atom」に相当する「chunk」も「atom」と呼んでいます
    * LIST chunk の Data にChunk IDが含まれた場合、本ツールでは ID 分のサイズ(4バイト)を引いた Payload のサイズを出しています。その為、他のツールと見比べた時に、 Chunk の Size 値をそのまま表示する動作の場合は値が異なってしまいます
    * Preview の表示は全て「unknown atom type」になります

# ライセンス表記

* Bulma by Jeremy Thomas.  
Code copyright 2019 Jeremy Thomas. Code released under the MIT license.
* Font Awesome is licensed under the SIL OFL 1.1 License
* Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

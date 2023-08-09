---
author: Lucius Choi
pubDatetime: 2023-08-09T09:00:00+09:00
title: 브로드캐스팅 콜백시 터보 스트림의 중복 메시지 업데이트
postSlug: turbo-stream-with-broadcasting-callback
featured: true
draft: false
tags:
  - rails
  - turbo-stream
  - broadcast
description: 터보스트림으로 데이터를 추가할 때 브로드캐스팅하면 동일한 메시지가 중복되어 표시되는 이슈
---

지난 8월 8일 진행되었던 RORLAB ONLINE LECTURE: TOPIC LECTURE 에서 HOTWIRE#TURBO 라이브 코딩 중에 있었던 이벤트를 소개합니다.

Comment 모델 클래스에 after_create_commit 콜백시에 action cable로 브로드캐스팅하도록 해 놓았던 상태에서, comment를 save한 후 create.turbo_stream.erb 로 렌더링하면 동일한 ID의 comment가 두번 표시될 것으로 예상하였습니다.

그러나 예상밖으로 Comment를 추가한 사용자의 페이지에 해당 comment가 중복되지 않고 한번만 표시되어 이유를 알지 못했습니다.

결과는 바람직한 것이지만 zoom 온라인 강좌를 마친 후 검색한 결과, 레일스 7이 발표된 2021년에 이미 이러한 문제가 버그로 제기되어 중복 표시되는 메시지의 경우는 추가되는 ID의 메시지가 업데이트되도록 개선이 된 것을 알지 못했던 것이었습니다.

DHH가 2021년 6월 일 이 문제를 fix한 PR을 머지했던 것으로 확인했습니다. 관련 글에 대한 링크입니다. https://github.com/hotwired/turbo/pull/240

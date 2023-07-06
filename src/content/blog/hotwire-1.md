---
author: Lucius Choi
pubDatetime: 2023-07-05T15:57:52+09:00
title: Hotwire (1)
postSlug: hotwier-1
featured: true
draft: true
ogImage: https://www.driftingruby.com/episodes/hotwire/download_image.png
tags:
  - article
  - hotwire
description: Hotwire는 웹 애플리케이션을 구축하기 위한 새로운 접근 방식을 제공합니다. 이 접근 방식은 더 나은 사용자 경험을 제공하면서도, 더 적은 코드를 작성하고, 더 빠르게 개발할 수 있도록 도와줍니다.
---

## Hotwire란?

자바스크립트를 사용하여 `JSON` 데이터를 가져오는 방식은 자바스크립트의 복잡한 코드를 필요로 하기 때문에 다소 어려운 감이 있습니다. 이러한 상황에서 `Hotwire`는 자바스크립트를 사용하지 않고 `JSON` 데이터 대신에 더 적은 코드를 작성하여 `HTML` 데이터를 가져오는 방식을 제공합니다.

`Hotwire`는 다음과 같은 기술로 구성되어 있습니다.

- `Turbo`는 `HTML`을 서버에서 렌더링하고, 브라우저에서는 페이지 간 이동을 최소화합니다.
- `Stimulus`는, `Turbo`가 자바스크립트가 처리하는 상호작용의 최소 80%를 담당하지만 여전히 나머지 20%정도는 자바스크립의 코딩이 필요로 하는데, 바로 이 부분을 쉽게 접근할 수 있도록 해 줍니다.
- `Strada`는 모바일 하이브리드 애플리케이션에서 웹과 네이티브 파트가 `HTML` 브리지 속성을 통해 서로 통신하는 방식을 표준화합니다. `Strada`는 2023년에 발표될 것입니다.

이번 글에서는 `Hotwire`의 첫 번째 기술인 `Turbo`에 대해서 알아보겠습니다.

## Turbo란?

`Turbo`는 웹 애플리케이션에서 작성하게 되는 많은 양의 자바스크립트 코드를 회기적으로 줄여주는 보완 기술을 사용합니다. Turbo는 다음과 같은 기능을 제공합니다.

- `Turbo Drive`는 전체 페이지를 다시 로드할 필요없이 `링크`와 `폼 서밋` 처리를 가속화합니다.
- `Turbo Frames`는 페이지를 독자적인 컨텍스트로 분리하여 전체 페이지 이동없이 해당 컨텍스트만을 비동기적으로 업데이트합니다.
- `Turbo Streams`는 `웹소켓`, [SSE](https://surviveasdev.tistory.com/entry/%EC%9B%B9%EC%86%8C%EC%BC%93-%EA%B3%BC-SSEServer-Sent-Event-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0), 또는 `HTML과 CRUD 같은 작업만으로 폼 서밋에 응답하는 방식`으로 페이지의 업데이트할 내용을 전달합니다.
- `Turbo Native`는 웹과 네이티브 부분 사이의 원활한 전환을 가능하도록 하므로써 [`majestic monolith`](https://m.signalvnoise.com/the-majestic-monolith/)가 네이티브 iOS 앱과 Android 앱의 중심이 되도록 합니다.

이 모든 것이 HTML을 유선상으로 전송하므로써 가능해지고, 모자라는 부분은 hotwire의 stimulus를 통해 보완하게 됩니다.

결국, `Turbo`는 모든 로직은 클라이언트 측에 두고 서버 측에는 JSON 데이터만을 전송하는 기존 방식과는 달리, 자바스크립 코딩없이 대부분의 로직을 서버 측에 두고 서버 측에서 렌더링한 HTML 코드를 클라이언트 측으로 전달하는 방식을 사용합니다.

### Turbo Drive

작성 중...

### Turbo Frames

작성 중...

### Turbo Streams

작성 중...

### Turbo Native

작성 중...

## 간단한 Turbo Drive 예제

샘플 프로젝트를 생성합니다.

```bash
$ rails new turbo-drive-demo -d sqlite3
$ cd turbo-drive-demo
$ bin/setup
```

pages 컨트롤러와 home, about, contact 액션을 생성합니다.

```bash
$ rails g controller pages home about contact
      create  app/controllers/pages_controller.rb
       route  get 'pages/home'
              get 'pages/about'
              get 'pages/contact'
      invoke  erb
      create    app/views/pages
      create    app/views/pages/home.html.erb
      create    app/views/pages/about.html.erb
      create    app/views/pages/contact.html.erb
      invoke  test_unit
      create    test/controllers/pages_controller_test.rb
      invoke  helper
      create    app/helpers/pages_helper.rb
      invoke    test_unit
```

이 한 줄의 명령어로 레일스는 `pages` 컨트롤러와 `home`, `about`, `contact` 액션과 뷰 파일들을 생성해 줍니다.

이제 `config/routes.rb` 파일을 열고 루트 라우트를 `pages#home`으로 변경합니다.

```ruby
Rails.application.routes.draw do
  # get 'pages/home' -> 삭제
  get 'pages/about'
  get 'pages/contact'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home" # <- 변경
end
```

![pages#home page capture](/assets/pages_home.png)

## 참고

- [Hotwire](https://hotwire.dev/)
- [Hotwire Turbo](https://turbo.hotwire.dev/)
- [Hotwire Stimulus](https://stimulus.hotwire.dev/)
- [Hotwire Strada](https://strada.hotwire.dev/)

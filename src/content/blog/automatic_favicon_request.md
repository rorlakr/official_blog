---
title: favicon.ico 요청 자동 응답하기 방지하기
author: Lucius Choi
pubDatetime: 2023-08-03T09:00:00+09:00
postSlug: automatic_favicon_request
featured: true
draft: false
tags:
  - favicon
  - browser
description: 대부분의 웹브라우저는 favicon.ico 파일을 자동으로 요청합니다. 이를 방지하는 방법을 알아봅니다.
---

대부분의 웹브라우저는 `favicon.ico` 파일을 자동으로 요청합니다. 이를 방지하는 방법을 알아봅니다.

`HTML`의 문서의 `<head>` 부분에 아래의 코드를 추가합니다.

```html
<link rel="icon" href="data:," />
```

이제부터는 `favicon`이 지정되지 않은 경우 요청시마다 `favicon.ico` 파일을 요청하지 않습니다.

감사합니다. 😊

> 참고문서:
>
> - [How to Prevent Automatic Favicon Requests (Web Performance Quick Tip)](https://webdesign.tutsplus.com/prevent-automatic-favicon-requests--cms-34762t)

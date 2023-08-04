---
title: Tailwindcss + Devise
author: Lucius Choi
pubDatetime: 2023-07-17T17:34:00+09:00
postSlug: rails-tailwind-devise
featured: true
draft: false
tags:
  - rails7
  - tailwindcss
  - devise
description: Tailswindcss를 Rails 7 프로젝트에 추가하고 Devise를 이용하여 회원가입, 로그인, 로그아웃을 구현합니다.
---

이 글에서는 `Tailwindcss`를 사용하여 Rails 7 프로젝트를 깔끔하게 만들어보겠습니다. 또한 `Devise`를 이용하여 회원가입, 로그인, 로그아웃을 구현하고 간단한 게시판을 구현해 보겠습니다.

여기에서 사용하게 될 `gem`은 다음과 같습니다.

```ruby
# tailwindcss를 사용하기 위한 gem 입니다.
gem tailwindcss-rails
# 회원가입, 로그인, 로그아웃을 구현해 줍니다.
gem devise
 # devise view를 tailwindcss 용으로 생성해 줍니다.
gem devise-tailwinded
```

## 1. 프로젝트 생성

```bash
# Terminal
$ rails new blog7
$ cd blog7
$ bin/setup
```

## 2. Tailwindcss 설치

```bash
# Terminal
$ bundle add tailwindcss-rails
$ rails tailwindcss:install
```

## 3. 루트 페이지 생성

```bash
# Terminal
$ rails g controller pages home
```

```ruby
# config/routes.rb
root to: 'pages#home'
```

## 4. Devise 설치

```bash
# Terminal
$ bundle add devise
$ rails g devise:install
```

```ruby
# config/environments/development.rb
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

```bash
# Terminal
$ rails g devise User
$ rails db:migrate
```

### devsie-tailwinded 설치

```bash
# Terminal
$ bundle add devise-tailwinded
$ rails g devise:views:tailwinded
```

## 5. 로컬 서버 실행

```bash
# Terminal
$ bin/dev
```

## 6. Post 모델과 CRUD 구현

레일스에서 모델명과 컬럼명을 지정해 주면 자동으로 `CRUD`를 구현해 줍니다. 이번에는 `Post` 모델을 생성하고 `title`, `content` 컬럼을 추가해 보겠습니다.

```bash
# Terminal
$ rails g scaffold Post writer:references title content:text
```

한가지 주목할 것은 `writer:references`(또는 `writer:belongs_to`) 입니다. 이는 `writer` 컬럼을 추가해 주는데 `writer` 컬럼이 `post` 모델과 연결되어 있음을 알려 줍니다. 이와 같이 `scaffold` 제너레이터를 사용하여 모델을 생성할 때 특히 참조할 테이블명과 다른 이름의 컬럼을 생성할 때는 `foreign_key: true` 부분의 `true`를 삭제하고 `{ to_table: :users }` 와 같이 실존하는 테이블명을 지정해 주어야 합니다.

물론 여기서 `user:references` 와 같이 작성해도 되는데 이 경우에는 `foreign_key: true` 만으로도 충분합니다.

```ruby
# db/migrate/20230717085046_create_posts.rb
t.references :writer, null: false, foreign_key: true

# foreign_key
t.references :writer, null: false, foreign_key: { to_table: :users }
```

post 모델과 user 모델을 연결해 줍니다.

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :writer, class_name: 'User'
end
```

```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts, foreign_key: :writer_id, dependent: :destroy
end
```

이제 실제로 테이블을 생성하기 위해서 마이그레이션을 실행합니다.

```bash
# Terminal
$ rails db:migrate
```

게시물에 대한 작성자를 입력하는 일반적인 방법은 form 에서 input 으로 작성자를 입력 받지 않고, `posts` 컨트롤러의 `create` 액션에서 현재 로그인한 유저의 `id` 를 `writer_id` 로 지정해 주는 것입니다.

먼저, 아래와 같이 form 페이지에서 `writer_id` 입력 받는 부분을 삭제해 줍니다.

```erb
<!-- app/views/posts/_form.html.erb -->
···
<div class="my-5">
  <%= form.label :writer_id %>
  <%= form.text_field :writer_id, class: "block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" %>
</div>
···
```

다음으로, `posts` 컨트롤러의 `create` 액션에서 `writer_id` 를 현재 로그인한 유저의 `id` 로 지정해 줍니다.

```ruby
# app/controllers/posts_controller.rb
def create
  @post = Post.new(post_params)
  @post.writer = current_user # <- 추가

  ···

end
```

이번 글에서는 레일스 7 프로젝트를 생성한 후 twailwindcss를 추가하고 devise를 이용하여 회원가입, 로그인, 로그아웃을 구현해 보았습니다. 또한 간단한 게시판을 구현해 보았습니다.

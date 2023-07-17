---
title: Tailwindcss + Devise
author: Lucius Choi
pubDatetime: 2023-07-17T17:34:00+09:00
postSlug: rails-tailwind-devise
featured: true
draft: true
tags:
  - rails7
  - tailwindcss
  - devise
description: Tailswindcss를 Rails 7 프로젝트에 추가하고 Devise를 이용하여 회원가입, 로그인, 로그아웃을 구현합니다.
---

이 글에서는 Tailwindcss를 사용하여 Rails 7 프로젝트를 깔끔하게 만들어보겠습니다. 또한 Devise를 이용하여 회원가입, 로그인, 로그아웃을 구현하고 간단한 게시판을 구현해 보겠습니다.

여기에서 사용하게 될 gem은 다음과 같습니다.

```ruby
# Gemfile
gem tailwindcss-rails
gem devise
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

```bash
# Terminal
$ rails g scaffold Post writer:references title content:text
```

```ruby
# db/migrate/20230717085046_create_posts.rb
t.references :writer, null: false, foreign_key: true

# foreign_key
t.references :writer, null: false, foreign_key: { to_table: :users }
```

```bash
# Terminal
$ rails db:migrate
```

```erb
<!-- app/views/posts/_form.html.erb -->
<div class="my-5">
  <%= form.label :writer_id %>
  <%= form.text_field :writer_id, class: "block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" %>
</div>
```

```ruby
# app/controllers/posts_controller.rb
def create
  @post = Post.new(post_params)
  @post.writer = current_user # <- 추가

  ...

end
```

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :writer, class_name: 'User'
end
```

<style is:global>
  code {
    font-family: monospace !important;
  }
</style>

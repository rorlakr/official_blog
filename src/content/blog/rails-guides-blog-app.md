---
title: 레일스 가이드 Blog 샘플 프로젝트 따라하기
author: Lucius Choi
pubDatetime: 2023-08-04T09:00:00+09:00
postSlug: rails-guides-blog-app
featured: false
draft: false
tags:
  - rails
  - guides
  - blog
description: 레일스 공식 가이드의 Blog 샘플 프로젝트의 코드를 따라해보는 글입니다.
---

## 개발환경

```bash
$ ruby -v
ruby 3.1.2p20

$ rails -v
Rails 7.0.6

$ sqlite3 --version
3.28.0 2019-04-16 19:49:53
```

## Blog 앱 생성 후 디렉토리 이동하기

```bash
$ rails new blog
$ cd blog
```

## 웹서버 실행하기

```bash
$ bin/rails server
```

## 라우트 정의하기

```ruby
Rails.application.routes.draw do
  get "/articles", to: "articles#index"
end
```

## ArticlesController와 index 액션 정의하기

```bash
$ bin/rails generate controller Articles index --skip-routes
```

## Hello, Rails! 출력하기

```html
<h1>Hello, Rails!</h1>
```

## 홈페이지 지정하기

```ruby
Rails.application.routes.draw do
  root "articles#index"

  get "/articles", to: "articles#index"
end
```

## Article 모델 생성하기

```bash
$ bin/rails generate model Article title:string body:text
```

## 데이터베이스 마이그레이션

```bash
$ bin/rails db:migrate
```

## 콘솔 작업하기

```bash
$ bin/rails console
Loading development environment (Rails 7.0.6)
irb(main):001:0>
```

## Article 객체 생성하기

```ruby
irb> article = Article.new(title: "Hello Rails", body: "I am on Rails!")
```

## 저장하기

```sql
irb> article.save
  TRANSACTION (0.1ms)  begin transaction
  Article Create (0.5ms)  INSERT INTO "articles" ("title", "body", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["title", "Hello Rails"], ["body", "I am on Rails!"], ["created_at", "2023-08-03 15:43:25.397836"], ["updated_at", "2023-08-03 15:43:25.397836"]]
  TRANSACTION (1.0ms)  commit transaction
=> true
```

## 저장한 객체 확인하기

```ruby
irb> article
=>
#<Article:0x0000000110f785d0
 id: 1,
 title: "Hello Rails",
 body: "I am on Rails!",
 created_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00,
 updated_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00>
```

## `find` 메소드 호출하기

```ruby
irb> Article.find(1)
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" WHERE "articles"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
=>
#<Article:0x0000000111283388
 id: 1,
 title: "Hello Rails",
 body: "I am on Rails!",
 created_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00,
 updated_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00>
```

## `all` 메소드 호출하기

```ruby
irb> Article.all
  Article Load (0.2ms)  SELECT "articles".* FROM "articles"
=>
[#<Article:0x00000001111b39f8
  id: 1,
  title: "Hello Rails",
  body: "I am on Rails!",
  created_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00,
  updated_at: Thu, 03 Aug 2023 15:43:25.397836000 UTC +00:00>]
```

## Articles 목록 보여주기

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
end
```

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <%= article.title %>
    </li>
  <% end %>
</ul>
```

## Article 보기

✏️ config/routes.rb

```ruby
Rails.application.routes.draw do
  root "articles#index"

  get "/articles", to: "articles#index"
  get "/articles/:id", to: "articles#show"
end
```

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end
end
```

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>
```

> 브라우저: [http://localhost:3000/articles/1](http://localhost:3000/articles/1)

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <a href="/articles/<%= article.id %>">
        <%= article.title %>
      </a>
    </li>
  <% end %>
</ul>
```

## 리소스 라우팅

✏️ config/routes.rb

```ruby
Rails.application.routes.draw do
  root "articles#index"

  resources :articles
end
```

## 라우트 매핑 보기

```bash
bin/rails routes -g articles
      Prefix Verb   URI Pattern                  Controller#Action
        root GET    /                            articles#index
    articles GET    /articles(.:format)          articles#index
             POST   /articles(.:format)          articles#create
 new_article GET    /articles/new(.:format)      articles#new
edit_article GET    /articles/:id/edit(.:format) articles#edit
     article GET    /articles/:id(.:format)      articles#show
             PATCH  /articles/:id(.:format)      articles#update
             PUT    /articles/:id(.:format)      articles#update
             DELETE /articles/:id(.:format)      articles#destroy
```

## Article 링크에 경로 헬퍼메소드 사용하기

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <a href="<%= article_path(article) %>">
        <%= article.title %>
      </a>
    </li>
  <% end %>
</ul>
```

## `link_to` 헬퍼 사용하기

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <%= link_to article.title, article %>
    </li>
  <% end %>
</ul>
```

## Article 추가하기

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(title: "...", body: "...")

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end
end
```

## Form Builder 사용하기

✏️ app/views/articles/new.html.erb

```erb
<h1>New Article</h1>

<%= form_with model: @article do |form| %>
  <div>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </div>

  <div>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

## Strong Parameter 사용하기

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def article_params
      params.require(:article).permit(:title, :body)
    end
end
```

## 유효성 검증과 오류 메시지 표시하기

✏️ app/models/article.rb

```ruby
class Article < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

✏️ app/views/articles/new.html.erb

```erb
<h1>New Article</h1>

<%= form_with model: @article do |form| %>
  <div>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
    <% @article.errors.full_messages_for(:title).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.label :body %><br>
    <%= form.text_area :body %><br>
    <% @article.errors.full_messages_for(:body).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

## `new` 와 `create`의 연계 - 유효성 검증 시점

```ruby
  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end
```

> 브라우저: http://localhost:3000/articles/new

## Article 작성 링크 추가

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <%= link_to article.title, article %>
    </li>
  <% end %>
</ul>

<%= link_to "New Article", new_article_path %>
```

## Article 업데이트하기 - `edit`와 `update` 액션

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private
    def article_params
      params.require(:article).permit(:title, :body)
    end
end
```

## Partial template을 사용하여 뷰 코드 공유하기

✏️ app/views/articles/\_form.html.erb

```erb
<%= form_with model: article do |form| %>
  <div>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
    <% article.errors.full_messages_for(:title).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.label :body %><br>
    <%= form.text_area :body %><br>
    <% article.errors.full_messages_for(:body).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>
```

✏️ app/views/articles/new.html.erb

```erb
<h1>New Article</h1>

<%= render "form", article: @article %>
```

✏️ app/views/articles/edit.html.erb

```erb
<h1>Edit Article</h1>

<%= render "form", article: @article %>
```

## Article 수정 링크 추가

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
</ul>
```

> 브라우저: http://localhost:3000/articles/1/edit

## Article 삭제하기

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    redirect_to root_path, status: :see_other
  end

  private
    def article_params
      params.require(:article).permit(:title, :body)
    end
end
```

## 삭제 링크 추가하기

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article), data: {
                    turbo_method: :delete,
                    turbo_confirm: "Are you sure?"
                  } %></li>
</ul>
```

## Comment 모델 생성하기

```bash
$ bin/rails generate model Comment commenter:string body:text article:references
      invoke  active_record
      create    db/migrate/20230803173103_create_comments.rb
      create    app/models/comment.rb
      invoke    test_unit
      create      test/models/comment_test.rb
      create      test/fixtures/comments.yml
```

## 데이터베이스 마이그레이션

```bash
$ bin/rails db:migrate
== 20230803173103 CreateComments: migrating ===================================
-- create_table(:comments)
   -> 0.0024s
== 20230803173103 CreateComments: migrated (0.0024s) ==========================
```

## 모델 연결하기

✏️ app/models/article.rb

```ruby
class Article < ApplicationRecord
  has_many :comments

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

> `@article.comments`

## Comments 라우트 추가하기

✏️ config/routes.rb

```ruby
Rails.application.routes.draw do
  root "articles#index"

  resources :articles do
    resources :comments
  end
end
```

> a `nested` resource

## Comments 컨트롤러 생성하기

```bash
$ bin/rails generate controller Comments
```

## Comment 추가하기

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article), data: {
                    turbo_method: :delete,
                    turbo_confirm: "Are you sure?"
                  } %></li>
</ul>

<h2>Add a comment:</h2>
<%= form_with model: [ @article, @article.comments.build ] do |form| %>
  <p>
    <%= form.label :commenter %><br>
    <%= form.text_field :commenter %>
  </p>
  <p>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </p>
  <p>
    <%= form.submit %>
  </p>
<% end %>
```

✏️ app/controllers/comments_controller.rb

```ruby
class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to article_path(@article)
  end

  private
    def comment_params
      params.require(:comment).permit(:commenter, :body)
    end
end
```

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article), data: {
                    turbo_method: :delete,
                    turbo_confirm: "Are you sure?"
                  } %></li>
</ul>

<h2>Comments</h2>
<% @article.comments.each do |comment| %>
  <p>
    <strong>Commenter:</strong>
    <%= comment.commenter %>
  </p>

  <p>
    <strong>Comment:</strong>
    <%= comment.body %>
  </p>
<% end %>

<h2>Add a comment:</h2>
<%= form_with model: [ @article, @article.comments.build ] do |form| %>
  <p>
    <%= form.label :commenter %><br>
    <%= form.text_field :commenter %>
  </p>
  <p>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </p>
  <p>
    <%= form.submit %>
  </p>
<% end %>
```

## Partial Collections 렌더링하기

✏️ app/views/comments/\_comment.html.erb

```erb
<p>
  <strong>Commenter:</strong>
  <%= comment.commenter %>
</p>

<p>
  <strong>Comment:</strong>
  <%= comment.body %>
</p>
```

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article), data: {
                    turbo_method: :delete,
                    turbo_confirm: "Are you sure?"
                  } %></li>
</ul>

<h2>Comments</h2>
<%= render @article.comments %>

<h2>Add a comment:</h2>
<%= form_with model: [ @article, @article.comments.build ] do |form| %>
  <p>
    <%= form.label :commenter %><br>
    <%= form.text_field :commenter %>
  </p>
  <p>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </p>
  <p>
    <%= form.submit %>
  </p>
<% end %>
```

## Partial Form 렌더링하기

✏️ app/views/comments/\_form.html.erb

```erb
<%= form_with model: [ @article, @article.comments.build ] do |form| %>
  <p>
    <%= form.label :commenter %><br>
    <%= form.text_field :commenter %>
  </p>
  <p>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </p>
  <p>
    <%= form.submit %>
  </p>
<% end %>
```

✏️ app/views/articles/show.html.erb

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article), data: {
                    turbo_method: :delete,
                    turbo_confirm: "Are you sure?"
                  } %></li>
</ul>

<h2>Comments</h2>
<%= render @article.comments %>

<h2>Add a comment:</h2>
<%= render 'comments/form' %>
```

> 🔥`노트` : 인스턴스 변수는 partial template에서도 사용할 수 있다.

## Concerns 사용하기

✏️ Migrations to add status to Articles and Comments

```bash
$ bin/rails generate migration AddStatusToArticles status:string
$ bin/rails generate migration AddStatusToComments status:string
$ bin/rails db:migrate
```

✏️ app/controllers/articles_controller.rb

```ruby
private

def article_params
  params.require(:article).permit(:title, :body, :status)
end
```

✏️ app/controllers/comments_controller.rb

```ruby
private

def comment_params
  params.require(:comment).permit(:commenter, :body, :status)
end
```

## Status 속성 관련 사항 추가하기

✏️ app/modesl/article.rb

```ruby
class Article < ApplicationRecord
  has_many :comments

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }

  VALID_STATUSES = ['public', 'private', 'archived']

  validates :status, inclusion: { in: VALID_STATUSES }

  def archived?
    status == 'archived'
  end
end
```

✏️ app/models/comment.rb

```ruby
class Comment < ApplicationRecord
  belongs_to :article

  VALID_STATUSES = ['public', 'private', 'archived']

  validates :status, inclusion: { in: VALID_STATUSES }

  def archived?
    status == 'archived'
  end
end
```

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <% unless article.archived? %>
      <li>
        <%= link_to article.title, article %>
      </li>
    <% end %>
  <% end %>
</ul>

<%= link_to "New Article", new_article_path %>
```

✏️ app/views/comments/\_comment.html.erb

```erb
<% unless comment.archived? %>
  <p>
    <strong>Commenter:</strong>
    <%= comment.commenter %>
  </p>

  <p>
    <strong>Comment:</strong>
    <%= comment.body %>
  </p>
<% end %>
```

### 🔥Visible Concern 추가하기

✏️ app/models/concerns/visible.rb

```ruby
module Visible
  def archived?
    status == 'archived'
  end
end
```

> 유효성 검증 메소드는 `클래스 메소드`이다.

✏️ Validates 클래스 메소드 포함하기

```ruby
module Visible
  extend ActiveSupport::Concern

  VALID_STATUSES = ['public', 'private', 'archived']

  included do
    validates :status, inclusion: { in: VALID_STATUSES }
  end

  def archived?
    status == 'archived'
  end
end
```

> 🔥참고 : [Ruby modules – included do end block](https://itecnote.com/tecnote/ruby-modules-included-do-end-block/)

✏️ app/models/article.rb

```ruby
class Article < ApplicationRecord
  include Visible

  has_many :comments

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

✏️ app/models/comment.rb

```ruby
class Comment < ApplicationRecord
  include Visible

  belongs_to :article
end
```

## Concern에 클래스 메소드 추가하기

✏️ app/models/concerns/visible.rb

```ruby
module Visible
  extend ActiveSupport::Concern

  VALID_STATUSES = ['public', 'private', 'archived']

  included do
    validates :status, inclusion: { in: VALID_STATUSES }
  end

  class_methods do
    def public_count
      where(status: 'public').count
    end
  end

  def archived?
    status == 'archived'
  end
end
```

✏️ app/views/articles/index.html.erb

```erb
<h1>Articles</h1>

Our blog has <%= Article.public_count %> articles and counting!

<ul>
  <% @articles.each do |article| %>
    <% unless article.archived? %>
      <li>
        <%= link_to article.title, article %>
      </li>
    <% end %>
  <% end %>
</ul>

<%= link_to "New Article", new_article_path %>
```

✏️ app/views/articles/\_form.html.erb

```erb
<div>
  <%= form.label :status %><br>
  <%= form.select :status, ['public', 'private', 'archived'], selected: 'public' %>
</div>
```

✏️ app/views/comments/\_form.html.erb

```erb
<p>
  <%= form.label :status %><br>
  <%= form.select :status, ['public', 'private', 'archived'], selected: 'public' %>
</p>
```

## Comment 삭제하기

✏️ app/views/comments/\_comment.html.erb

```erb
<% unless comment.archived? %>
  <p>
    <strong>Commenter:</strong>
    <%= comment.commenter %>
  </p>

  <p>
    <strong>Comment:</strong>
    <%= comment.body %>
  </p>

  <p>
    <%= link_to "Destroy Comment", [comment.article, comment], data: {
                  turbo_method: :delete,
                  turbo_confirm: "Are you sure?"
                } %>
  </p>
<% end %>
```

✏️ app/controllers/comments_controller.rb

```ruby
class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to article_path(@article)
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to article_path(@article), status: :see_other
  end

  private
    def comment_params
      params.require(:comment).permit(:commenter, :body, :status)
    end
end
```

### 🔥연관 객체 함께 삭제하기 옵션

✏️ app/models/article.rb

```ruby
class Article < ApplicationRecord
  include Visible

  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

## Basic Authentication

✏️ app/controllers/articles_controller.rb

```ruby
class ArticlesController < ApplicationController

  http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]

  def index
    @articles = Article.all
  end

  # snippet for brevity
```

✏️ app/controllers/comments_controller.rb

```ruby
class CommentsController < ApplicationController

  http_basic_authenticate_with name: "dhh", password: "secret", only: :destroy

  def create
    @article = Article.find(params[:article_id])
    # ...
  end

  # snippet for brevity
```

🎉 감사합니다.

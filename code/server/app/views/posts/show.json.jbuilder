# frozen_string_literal: true

json.(
  @post,
  :id,
  :content,
  :created_at,
  :updated_at
)

json.upvotes @post.upvotes.length
json.upvoted @post.users.include?(@user)

json.user do
  json.merge! @post.user.attributes.except("password_digest")
end

json.interests @post.interests

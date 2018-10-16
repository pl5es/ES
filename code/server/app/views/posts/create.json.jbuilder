json.(
  @post,
  :content,
  :created_at,
  :updated_at
)

json.user do
  json.merge! @post.user.attributes.except("password_digest")
end

json.interests @post.interests

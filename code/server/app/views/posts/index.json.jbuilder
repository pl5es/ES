json.(
  @post,
  :content,
  :created_at,
)

json.

json.user do
  json.merge! @post.user
end

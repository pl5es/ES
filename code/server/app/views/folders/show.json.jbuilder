# frozen_string_literal: true

json.(
  @folder,
  :id,
  :title,
  :created_at,
  :updated_at
)

json.bookmarks @folder.bookmarks

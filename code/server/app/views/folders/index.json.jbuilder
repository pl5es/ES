# frozen_string_literal: true

json.array! @folders, partial: "folders/folder", as: :folder

json.(
  @folder,
  :id,
  :title,
  :created_at,
  :updated_at
)

json.bookmarks @folder.bookmarks

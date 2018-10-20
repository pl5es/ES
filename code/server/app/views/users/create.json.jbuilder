# frozen_string_literal: true

json.(
  @user,
  :id,
  :description,
  :email,
  :institution,
  :name,
  :orcid,
  :research_area,
  :username,
  :interests,
  :created_at,
  :updated_at
)

json.avatar do
  json.url @user.avatar.url
end

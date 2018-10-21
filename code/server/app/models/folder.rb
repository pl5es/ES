class Folder < ApplicationRecord
  has_many :bookmarks
  belongs_to :user
end

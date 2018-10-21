# frozen_string_literal: true

class Folder < ApplicationRecord
  has_many :bookmarks
  belongs_to :user
end

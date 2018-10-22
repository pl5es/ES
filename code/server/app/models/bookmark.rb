# frozen_string_literal: true

class Bookmark < ApplicationRecord
  has_and_belongs_to_many :interests
  belongs_to :folder

  validates_presence_of :title, :url
end

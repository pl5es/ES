# frozen_string_literal: true

class Bookmark < ApplicationRecord
  has_and_belongs_to_many :interests
end

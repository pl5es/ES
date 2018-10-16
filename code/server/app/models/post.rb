# frozen_string_literal: true

class Post < ApplicationRecord
  has_and_belongs_to_many :interests
  belongs_to :user
end

# frozen_string_literal: true

class Post < ApplicationRecord
  has_and_belongs_to_many :interests
  has_many :upvotes
  has_many :users, through: :upvotes
  belongs_to :user

  validates_presence_of :content
end

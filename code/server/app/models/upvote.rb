# frozen_string_literal: true

class Upvote < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates_uniqueness_of :user, scope: :post, message: "Already upvoted"
end

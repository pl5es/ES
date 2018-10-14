# frozen_string_literal: true

class Interest < ApplicationRecord
  has_and_belongs_to_many :users
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe Bookmark, type: :model do
  it { should have_and_belong_to_many(:interests) }
  presence = [
    :title,
    :url
  ]
  presence.each do |p|
    it { should validate_presence_of(p) }
  end
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  presence = [
    :username,
    :email,
    :name,
    :orcid,
    :research_area,
    :institution
  ]
  presence.each do |p|
    it { should validate_presence_of(p) }
  end

  uniqueness = [
    :username,
    :email,
    :orcid
  ]
  uniqueness.each do |u|
    it { should validate_uniqueness_of(u) }
  end
end

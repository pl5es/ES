# frozen_string_literal: true

FactoryBot.define do
  factory :interest do
    hashtag { Faker::Lorem.word }
  end
end

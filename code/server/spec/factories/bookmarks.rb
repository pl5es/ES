# frozen_string_literal: true

FactoryBot.define do
  factory :bookmark do
    transient do
      interests_count { 5 }
    end

    title { Faker::Lorem.word }
    url { Faker::Internet.url }
    interests { FactoryBot.create_list(:interest, interests_count) }
  end
end

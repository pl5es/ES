# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    transient do
      userid { 1 }
      interests_count { 5 }
    end

    user_id { userid }
    content { Faker::Lorem.sentence(10) }
    interests { FactoryBot.create_list(:interest, interests_count) }
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    transient do
      interests_count { 10 }
    end

    description { Faker::Lorem.sentence(10) }
    email { Faker::Internet.email }
    institution { Faker::Educator.university }
    name  { Faker::Name.name }
    orcid { Faker::Number.number(10) }
    password { "password" }
    research_area { Faker::Lorem.word }
    username { Faker::Internet.username }
    interests { FactoryBot.create_list(:interest, interests_count) }
  end
end

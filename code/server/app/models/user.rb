# frozen_string_literal: true

require "file_size_validator"

class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :interests
  validates_presence_of :username, :name, :orcid, :research_area, :institution
  validates_uniqueness_of :username, :email, :orcid
  validates :avatar, file_size: { maximum: 2.megabytes }

  mount_uploader :avatar, AvatarUploader

  def info
    as_json(
      except: [:password_digest, :avatar],
      include: [:interests, {
        avatar: {
          only: :url
        }
      }])
  end

  def associate_interests(s_interests)
    # Have all interest models and create the ones that dont exist
    ints = []
    s_interests.each do |hashtag|
      i = Interest.new(hashtag: hashtag)
      if i.save
        ints.push(i)
      else
        ints.push(Interest.find_by(hashtag: hashtag))
      end
    end

    # Create association between user and interests
    ints.each do |i|
      unless i.users.include?(self)
        i.users.push(self)
      end
    end

  end
end

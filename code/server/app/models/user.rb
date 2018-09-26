class User < ApplicationRecord
  has_secure_password

  has_many :interests

  validates_presence_of :username, :description, :name, :ORCID, :research_area, :institution

  validates_uniqueness_of :username, :email, :ORCID
end

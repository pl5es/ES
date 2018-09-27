class User < ApplicationRecord
  has_secure_password

  has_many :interests

  validates_presence_of :username, :email, :description, :name, :ORCID, :research_area, :institution

  validates_uniqueness_of :username, :email, :ORCID

  def info
    slice(:id, :username, :email, :description, :name, :ORCID, :research_area, :institution, :updated_at, :created_at)
  end
end

class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :description
      t.string :name
      t.bigint :ORCID
      t.string :research_area
      t.string :institution
      t.timestamps
    end

    create_table :interests do |t|
      t.string :hashtag
      t.belongs_to :user
      t.timestamps
    end
  end
end

class CreateUpvotes < ActiveRecord::Migration[5.2]
  def change
    create_table :upvotes do |t|
      t.belongs_to :user, index: true
      t.belongs_to :post, index: true
      t.timestamps
    end
  end
end
